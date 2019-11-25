import requests

def addRow(databaseId, secret, row):
    strRow = str(row).replace('\'', '"')
    req = requests.post('http://scribble-server:8000/user-databases/insert', data={ "database_id" : databaseId, "secret" : secret, "row" : strRow })
    return req

def delRow(databaseId, secret, comparisonCol, comparison, operand):
    req = requests.post("http://scribble-server:8000/user-databases/remove", data={"database_id": databaseId, "secret" : secret, "comparisonColumn": comparisonCol, "comparison" : comparison, "operand" : operand})
    return req

def findRow(databaseId, secret, columns, comparisonCol, comparison, operand):
    req = requests.post("http://scribble-server:8000/user-databases/find", data={"database_id" : databaseId, "secret": secret, "comparisonColumn": comparisonCol, "comparison":comparison, "operand":operand, "columns":columns})
    return req
