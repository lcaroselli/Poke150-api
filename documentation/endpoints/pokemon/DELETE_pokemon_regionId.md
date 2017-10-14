# Pokemon Endpoint

```
DELETE pokemon/:region_id
```

## Description
Deletes the specified pokemon from the database via the region id.

---

## Requires Authentication
- A valid [JSON Web Token](https://jwt.io/) is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Body**
- A registration email ending in **@turing.io** is required to access this endpoint.

## Parameters
- **region_id** — Database region ID number of the desired pokemon.


## Example

#### Request
```
https://poke150-api.herokuapp.com/api/v1/pokemon/008
```

#### Return
```json
{ "":"" }
```
