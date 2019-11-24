const PORT = 8080
const HTTP_SERVER_PORT = 80

const WebSocket = require('ws')
const UUID = require('uuid/v1')
const ChildProcess = require('child_process')
const { Readable } = require('stream')
const { createServer } = require('http')
const url = require('url')

// WebSocket server class
class WSServer {
  isConnected = false

  constructor(path, command, cleanup, downloadLink, onDestroy) {
    this.PATH = path
    this.COMMAND = command.split(' ')
    this.CLEANUP = cleanup.split(' ')
    this.DOWNLOAD_LINK = downloadLink.split(' ')
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
      try {
        this.proc = ChildProcess.spawn(this.COMMAND[0], this.COMMAND.splice(1))
      } catch (error) {
        console.log('Error running command ' + this.COMMAND.join(' '))
        console.log(error)
        this.closeWSS()
      }

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
      })

      // Pipe close to websocket
      this.proc.on('close', (code) => {
        const exitMessage = `Done. Exit code ${code}`
        console.log(exitMessage)
        ws.send(exitMessage)
        if(this.DOWNLOAD_LINK) {
          ws.send('[download ready] ' + this.DOWNLOAD_LINK)
        }
        this.closeWSS()
      })

      // Handle errors
      this.proc.on('error', error => {
        console.log('Error running command ' + this.COMMAND.join(' '))
        console.log(error)
        this.closeWSS()
      })

      // Pipe websocket to subprocess stdin
      ws.on('message', (msg) => {
        console.log(`stdin: ${msg}`)
        const inStream = new Readable()
        inStream._read = () => {}
        inStream.push(msg)
        inStream.push('\n')
        inStream.pipe(this.proc.stdin)
      })

      // If connection to client is lost, clean up and exit gracefully
      ws.on('close', () => this.closeWSS(true))
    })
  }

  // Clean up running process and websocket server
  closeWSS (dontCloseServer) {
    if (this.proc && this.proc.exitCode === null && !this.proc.killed) {
      console.log('Killing subprocess')
      this.proc.kill()
    }

    // Run cleanup process
    if(this.CLEANUP) {
      try {
        console.log('Running cleanup command: ', this.CLEANUP.join(' '))
        this.cleanupProc = ChildProcess.spawn(this.CLEANUP[0], this.CLEANUP.splice(1))
  
        // Handle errors
        this.cleanupProc.on('error', error => {
          console.log('Error running command ' + this.CLEANUP.join(' '))
          console.log(error)
          this.closeWSS()
        })
        
      } catch (error) {
        console.log('Error running command ' + this.CLEANUP.join(' '))
        console.log(error)
      }
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
const webSocketServer = createServer((req, res) => {
  res.writeHead(200)
  res.write('200: OK')
  res.end()
})
webSocketServer.listen(PORT, () => { console.log('Starting WebSocket webserver server on port ' + PORT) })

// If an upgrade connection is made, execute handleUpgrade on all websocket servers to find
// the matching server. If none is found, destroy the socket
webSocketServer.on('upgrade', (req, socket, head) => {
  let requestedPathExists = false
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
  let CLEANUP = null

  if(QUERY.command) {
    try {
      COMMAND = decodeURIComponent(QUERY.command)
    } catch(e) {
      res.writeHead(403)
      res.write('403: Bad Request')
      res.end()
      return
    }

    if(QUERY.cleanup) {
      try {
        CLEANUP = decodeURIComponent(QUERY.cleanup)
      } catch (e) {
        res.writeHead(403)
        res.write('403: Bad Request')
        res.end()
        return
      }
    }

    if(QUERY.download) {
      try {
        DOWNLOAD = decodeURIComponent(QUERY.download)
      } catch (e) {
        res.writeHead(403)
        res.write('403: Bad Request')
        res.end()
        return
      }
    }
  }

  if(COMMAND) {
    const PATH = '/' + UUID()
    servers.push(new WSServer(PATH, COMMAND, CLEANUP, DOWNLOAD_LINK, (SERVER_UUID) => {
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
httpServer.listen(HTTP_SERVER_PORT, () => { console.log('Starting HTTP server on port ' + HTTP_SERVER_PORT) })
