import requests

def addRow(databaseId, secret, row):
    strRow = str(row)
    req = requests.post("http://api.localhost/user-database/add", { "database_id" : databaseId, "secret" : secret, "row" : row })
    req.raise_for_status()

def delRow(databaseId, secret, comparisonCol, comparison, operand):
    req = requests.post("http://api.localhost/user-database/delete", {"database_id": databaseId, "secret" : secret, "comparisonColumn": comparisonCol, "comparison" : comparison, "operand" : operand})
    req.raise_for_status()

def findRow(databaseId, secret, columns, comparisonCol, comparison, operand):
    req = requests.post("http://api.localhost/user-database/find", {"database_id" : databaseId, "secret": secret, "comparisonColumn": comparisonCol, "comparison":comparison, "operand":operand, "columns":columns})
    req.raise_for_status()

    return req.text
