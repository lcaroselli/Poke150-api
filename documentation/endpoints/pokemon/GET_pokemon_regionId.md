# Pokemon Endpoint

```
GET pokemon/:region_id
```

## Description
Returns a list of the pokemon in the database with the specified region ID.

---

## Authentication
There is no authentication necessary for this endpoint.

## Parameters
There are no parameters necessary for this endpoint.

## Queries
There are no queries for this endpoint.

## Errors
- **404 Not Found** — The pokemon does not exist in the database.

---

## Return Format
An array of objects with the following keys and values:

- **id** — Auto-incrementing ID number for the record in the database.
- **region_id** — Region id of the pokemon.
- **name** — Name of the pokemon.
- **attack_power** — Attack power of the pokemon.
- **defense_power** — Defense power of the pokemon.
- **hp** — Health points of the pokemon.
- **power_total** — Power total of the pokemon.
- **type_id** — Type ID and foreign ID to link to the type database.
- **primary_type** — Primary type of the pokemon.

## Examples

#### Request
```
https://poke150-api.herokuapp.com/api/v1/pokemon/008
```

#### Return shortened for example purpose
```json
[
    {
        "id": 462,
        "region_id": "008",
        "name": "Wartortle",
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
