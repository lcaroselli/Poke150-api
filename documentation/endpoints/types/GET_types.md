# Types Endpoint

```
GET types
```

## Description
Returns a list of _**all**_ types in the database.

---

## Authentication
There is no authentication necessary for this endpoint.

## Parameters
There are no parameters necessary for this endpoint.

## Queries
- **type_label** — Filter down to only the type with the desired type label.

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
https://poke150-api.herokuapp.com/api/v1/types/
```

#### Return shortened for example purpose
```json
[
    {
        "id": 73,
        "type_label": "sparkling",
        "created_at": "2017-10-13T17:28:51.524Z",
        "updated_at": "2017-10-13T17:28:51.524Z"
    },
    {
        "id": 67,
        "type_label": "fighting",
        "created_at": "2017-10-13T07:20:58.919Z",
        "updated_at": "2017-10-13T07:20:58.919Z"
    },
    {
        "id": 65,
        "type_label": "ground",
        "created_at": "2017-10-13T07:20:58.908Z",
        "updated_at": "2017-10-13T07:20:58.908Z"
    },
    {
        "id": 69,
        "type_label": "rock",
        "created_at": "2017-10-13T07:20:58.921Z",
        "updated_at": "2017-10-13T07:20:58.921Z"
    },
    {
        "id": 63,
        "type_label": "normal",
        "created_at": "2017-10-13T07:20:58.900Z",
        "updated_at": "2017-10-13T07:20:58.900Z"
    }
]
```
---
#### Request
```
https://poke150-api.herokuapp.com/api/v1/types?type_label=grass
```

#### Return
```json
[
    {
        "id": 60,
        "type_label": "grass",
        "created_at": "2017-10-13T07:20:58.885Z",
        "updated_at": "2017-10-13T07:20:58.885Z"
    }
]
```
