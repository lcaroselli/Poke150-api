# Pokemon Endpoint

```
GET pokemon
```

## Description
Returns a list of _**all**_ pokemon in the database.

---

## Authentication
There is no authentication necessary for this endpoint.

## Parameters
There are no parameters necessary for this endpoint.

## Queries
- **name** — Filter down to only the pokemon with the desired name.

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
https://poke150-api.herokuapp.com/api/v1/pokemon/
```

#### Return shortened for example purpose
```json
[
    {
        "id": 463,
        "region_id": "009",
        "name": "Blastoise",
        "attack_power": "83",
        "defense_power": "100",
        "hp": "79",
        "power_total": "530",
        "type_id": 59,
        "created_at": "2017-10-13T07:20:58.981Z",
        "updated_at": "2017-10-13T07:20:58.981Z",
        "primary_type": "water"
    },
    {
        "id": 471,
        "region_id": "017",
        "name": "Pidgeotto",
        "attack_power": "60",
        "defense_power": "55",
        "hp": "63",
        "power_total": "349",
        "type_id": 63,
        "created_at": "2017-10-13T07:20:59.003Z",
        "updated_at": "2017-10-13T07:20:59.003Z",
        "primary_type": "normal"
    },
    {
        "id": 480,
        "region_id": "026",
        "name": "Raichu",
        "attack_power": "90",
        "defense_power": "55",
        "hp": "60",
        "power_total": "475",
        "type_id": 66,
        "created_at": "2017-10-13T07:20:59.019Z",
        "updated_at": "2017-10-13T07:20:59.019Z",
        "primary_type": "electric"
    }
]
```
---
#### Request
```
https://poke150-api.herokuapp.com/api/v1/pokemon?name=Blastoise
```

#### Return shortened for example purpose
```json
[
    {
        "id": 463,
        "region_id": "009",
        "name": "Blastoise",
        "attack_power": "83",
        "defense_power": "100",
        "hp": "79",
        "power_total": "530",
        "type_id": 59,
        "created_at": "2017-10-13T07:20:58.981Z",
        "updated_at": "2017-10-13T07:20:58.981Z",
        "primary_type": "water"
    }
]
```
