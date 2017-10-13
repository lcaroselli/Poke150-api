# Pokemon Endpoint

```
POST pokemon
```

## Description

Creates one new pokemon in the database. This action is limited to admin access.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) with admin privileges is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Body**
- A registration email ending in **@turing.io** is required to access this endpoint.

***

## Parameters

To create a new pokemon, these are the required parameters that must be passed in the request body:
- **region_id** — Region id of the pokemon.
- **name** — Name of the pokemon.
- **attack_power** — Attack power of the pokemon.
- **defense_power** — Defense power of the pokemon.
- **hp** — Health points of the pokemon.
- **power_total** — Power total of the pokemon.
- **type_id** — Type ID and foreign ID to link to the type database.
- **primary_type** — Primary type of the pokemon.

***

## Errors

- **422 Unprocessable Entity** — 'Expected parameters: { region_id: <String>, name: <String>, attack_power: <String>, defense_power: <String>, hp: <String>, power_total: <String>, type_id: <Integer>, primary_type: <String> }. You're missing a ${pokeParameters}.'

***

## Return format

An array of one object (the new pokemon) with the following keys and values:

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
https://poke150-api.herokuapp.com/api/v1/pokemon/
```

**Return**

`status: 201`

```json

```
