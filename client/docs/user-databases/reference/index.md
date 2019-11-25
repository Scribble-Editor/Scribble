# ScribbleBase API Reference
This is a api reference on scribbleBase, for the getting started guide on ScribbleBase, see the scribbleDoc on [scribbleBase](../index.md).

Accessing scribbleBase's api, first import the scribbleBase module.

```python
import scribbleBase
```

scribbleBase supports a single table and connection is made when data is manipulated. A secret token is required at any call when manipulating data from scribbleBase.

## scribbleBase.addRow()
```python
addRow(databaseId, secret, row)
```

To insert into a database, provide the database ID, the database's secret token, and a dictionary. The dictionary should be key value pairs where each key corresponds to each column. Colummns must match how they are defined within the database. Not doing so will result in an exception being raised.

## scribbleBase.delRow()
```python
delRow(databaseId, secret, comparisonCol, operator, operand)
```

Deleting a row requires a database ID, the database's secret token, a comparsion column, an operator (See **Operators**), and an operand. Comparison Col is the equivalent to a WHERE clause in SQL. Operand is the data the uesr wishes to delete. 

## scribbleBase.findRow()
```python
findRow(databaseId, secret, columns, comparisonCol, comparison, operand)
```
Finding a row requires a database ID, the database's secret token, a comparsion column, an operator (See **Operators**), and an operand. Comparison Col is the equivalent to a WHERE clause in SQL. Operand is the data the uesr wishes to locate. 

## Operators
scribbleBase supports basic comparison operators. Note to use the name when passing into the request.
```python
IS_EQUAL_TO # ==
IS_NOT_EQUAL_TO # !=
IS_LESS_THAN # <
IS_GREATER_THAN # >
IS_GREATER_THAN_OR_EQUAL_TO # >=
IS_LESS_THAN_OR_EQUAL_TO # <=
```

