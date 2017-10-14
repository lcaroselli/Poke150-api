# Pokemon Endpoint

```
PATCH pokemon/:region_id
```

## Description

Updates one pokemon in the database. This action is limited to admin access.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) with admin privileges is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Body**
- A registration email ending in **@turing.io** is required to access this endpoint.

***

## Parameters

To update a pokemon you must pass in the region ID of the pokemon to patch.
  - **region_id** — Database region ID number of the desired pokemon.

***

## Errors

- **422 Unprocessable Entity** — 'Partial update failed, missing a parameter'

***

## Return format

An array of one object (the updated pokemon) with the following keys and values:

- **id** — Auto-incrementing ID number for the record in the database.
- **region_id** — Region id of the pokemon.
- **name** — Name of the pokemon.
- **attack_power** — Attack power of the pokemon.
- **defense_power** — Defense power of the pokemon.
- **hp** — Health points of the pokemon.
- **power_total** — Power total of the pokemon.
- **type_id** — Type ID and foreign ID to link to the type database.
- **primary_type** — Primary type of the pokemon.
***

## Example

**Request (Using JWT)**

```
https://poke150-api.herokuapp.com/api/v1/pokemon/008
```

**Return**
`status: 200`

```json
[
    {
        "id": 462,
        "region_id": "008",
        "name": "Wario",
        "attack_power": "63",
        "defense_power": "80",
        "hp": "59",
        "power_total": "405",
        "type_id": 59,
        "created_at": "2017-10-13T07:20:58.978Z",
        "updated_at": "2017-10-13T07:20:58.978Z",
        "primary_type": "water"
    }
]
```
