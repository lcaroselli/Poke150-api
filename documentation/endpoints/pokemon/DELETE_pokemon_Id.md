# Pokemon Endpoint

```
DELETE pokemon/id/:id
```

## Description
Deletes the specified pokemon from the database via the table id.

---

## Requires Authentication
- A valid [JSON Web Token](https://jwt.io/) is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Body**
- A registration email ending in **@turing.io** is required to access this endpoint.

## Parameters
- **id** — Database ID number of the desired pokemon.


## Example

#### Request
```
https://poke150-api.herokuapp.com/api/v1/pokemon/id/71
```

#### Return
```json
{ "":"" }
```
