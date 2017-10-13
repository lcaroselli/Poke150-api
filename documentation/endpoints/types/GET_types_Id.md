# Types Endpoint

```
GET types/:id
```

## Description
Returns a list of the types in the database with the specified ID.

---

## Authentication
There is no authentication necessary for this endpoint.

## Parameters
There are no parameters necessary for this endpoint.

## Queries
There are no queries for this endpoint.

## Errors
- **404 Not Found** — The type does not exist in the database.

---

## Return Format
An array of objects with the following keys and values:

- **id** — Auto-incrementing ID number for the record in the database.
- **type_label** — Type label.

## Examples

#### Request
```
https://poke150-api.herokuapp.com/api/v1/types/71
```

#### Return shortened for example purpose
```json

```
