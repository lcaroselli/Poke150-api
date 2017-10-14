# Types Endpoint

```
PUT types/:id
```

## Description

Updates one type in the database. This action is limited to admin access.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) with admin privileges is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Body**
- A registration email ending in **@turing.io** is required to access this endpoint.

***

## Parameters

To update a type you must pass in the ID of the type to put.
- **id** — Auto-incrementing ID number for the record in the database.
- **type_label** — Type label.

***

## Errors

- **422 Unprocessable Entity** — 'Update failed'

***

## Return format

An array of one object (the updated type) with the following keys and values:

- **id** — Auto-incrementing ID number for the record in the database.
- **type_label** — Type label.
***

## Example

**Request (Using JWT)**

```
https://poke150-api.herokuapp.com/api/v1/types/71
```

**Return**

`status: 200`

```json
[
    {
        "id": 71,
        "type_label": "icey",
        "created_at": "2017-10-13T07:20:58.924Z",
        "updated_at": "2017-10-13T07:20:58.924Z"
    }
]
```
