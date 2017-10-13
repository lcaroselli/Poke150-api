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

```
---
#### Request
```
https://poke150-api.herokuapp.com/api/v1/pokemon?name=Blastoise
```

#### Return shortened for example purpose
```json

```
