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

```
---
#### Request
```
https://poke150-api.herokuapp.com/api/v1/types?type_label=grass
```

#### Return shortened for example purpose
```json

```
