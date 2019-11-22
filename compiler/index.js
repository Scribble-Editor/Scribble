// Arguments
// npm start [PORT]
let args = process.argv.splice(2)
const PORT = args[0] || 8080

const WebSocket = require('ws')
const UUID = require('uuid/v1')
const ChildProcess = require('child_process')
const { Readable } = require('stream')
const { createServer } = require('http')
const url = require('url')

// WebSocket server class
class WSServer {
  isConnected = false

  constructor(path, command, onDestroy) {
    this.PATH = path
    this.COMMAND = command.split(' ')
    this.onDestroy = onDestroy
    
    // To overcome scope issues
    const self = this
    
    // Create websocket server
    this.wsServer = new WebSocket.Server({ noServer: true })
    console.log('Open connection at ' + this.PATH)

    // If websocket server is not connected to within 2 minutes, destroy websocket server
    setTimeout(() => {
      if(!self.isConnected) {
        this.closeWSS()
      }
    }, 2 * 60 * 1000)
    
    // Wait for connection to websocket server
    this.wsServer.on('connection', (ws) => {
      console.log('Connection established')
      console.log('Running command: ' + this.COMMAND.join(' '))

      // Set connected flag to true to prevent connection from being terminated 2 minutes after creation
      this.isConnected = true

      // Begin subprocess
      this.proc = ChildProcess.spawn(this.COMMAND[0], this.COMMAND.splice(1))

      // Pipe stdout to websocket
      this.proc.stdout.on('data', data => {
        data = data.toString().trim()
        const consoleOutputData = data.split('\n')

        console.log(`stdout:`)
        for(const line of consoleOutputData) {
          console.log(' | ' + line)
        }
        ws.send(data)
      })

      // Pipe stderr to websocket
      this.proc.stderr.on('data', (data) => {
        data = data.toString().trim()
        const consoleOutputData = data.split('\n')

        console.log(`stderr:`)
        for(const line of consoleOutputData) {
          console.log(' | ' + line)
        }
        ws.send(data)
      });

      // Pipe close to websocket
      this.proc.on('close', (code) => {
        const exitMessage = `child process exited with code ${code}`
        console.log(exitMessage)
        ws.send(exitMessage)
        this.closeWSS()
      });

      // Pipe websocket to subprocess stdin
      ws.on('message', (msg) => {
        console.log(`stdin: ${msg}`)
        const inStream = new Readable()
        inStream._read = () => {}
        inStream.push(msg)
        inStream.push('\n')
        inStream.pipe(this.proc.stdin)
      });

      // If connection to client is lost, clean up and exit gracefully
      ws.on('close', () => this.closeWSS(true))
    })
  }

  // Clean up running process and websocket server
  closeWSS (dontCloseServer) {
    if (this.proc.exitCode === null && !this.proc.killed) {
      console.log('Killing subprocess')
      this.proc.kill()
    }

    if(!dontCloseServer) {
      this.wsServer.close(() => {
        console.log('Connection closed at ' + this.PATH)
        this.onDestroy(this.UUID)
      })
    }
  }

  // Triggered on HTTP server upgrade request
  // If path of request matches WSServer's path, accept connection
  handleUpgrade(req, socket, head) {
    if(url.parse(req.url).pathname === this.PATH) {
      this.wsServer.handleUpgrade(req, socket, head, (ws) => {
        this.wsServer.emit('connection', ws, req)
      })
      return true
    }
    return false
  }

  // Return the UUID used to generate the WSServer's PATH
  get UUID() {
    return this.PATH.substr(1)
  }
}

// Hold all WSServer objects
const servers = []

// Create WebSocket webserver to host WebSockets separately from HTTP
const webSocketServer = createServer()
webSocketServer.listen(PORT, () => { console.log('Starting WebSocket webserver server on port ' + PORT) })

// If an upgrade connection is made, execute handleUpgrade on all websocket servers to find
// the matching server. If none is found, destroy the socket
webSocketServer.on('upgrade', (req, socket, head) => {
  let requestedPathExists = false;
  for(server of servers) {
    requestedPathExists = server.handleUpgrade(req, socket, head) || requestedPathExists
  }
  if(!requestedPathExists) {
    socket.destroy()
  }
})

// Create HTTP Server used to create websocket servers
const httpServer = createServer((req, res) => {
  const QUERY = url.parse(req.url, true).query
  let COMMAND = null

  if(QUERY.command) {
    try {
      COMMAND = decodeURIComponent(QUERY.command)
    } catch(e) {
      res.writeHead(403)
      res.write('403: Bad Request')
      res.end()
      return;
    }
  }

  if(COMMAND) {
    const PATH = '/' + UUID()
    servers.push(new WSServer(PATH, COMMAND, (SERVER_UUID) => {
      // When the onDestroy callback method is called, remove server from servers array
      const indexOfServerToDelete = servers.findIndex(server => server.UUID === SERVER_UUID)
      servers.splice(indexOfServerToDelete, 1)
    }))
    res.writeHead(200)
    res.write(PATH)
    res.end()

  } else {
    res.writeHead(403)
    res.write("403: Bad Request")
    res.end()
  }
})

// Start HTTP server
httpServer.listen(8000, () => { console.log('Starting HTTP server on port ' + 8000) })
