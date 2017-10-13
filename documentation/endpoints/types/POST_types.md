# Types Endpoint

```
POST types
```

## Description

Creates one new type in the database. This action is limited to admin access.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) with admin privileges is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Body**
- A registration email ending in **@turing.io** is required to access this endpoint.

***

## Parameters

To create a new type, these are the required parameters that must be passed in the request body:
- **type_label** — Type label.

***

## Errors

- **422 Unprocessable Entity** — 'Missing required property: type label'

***

## Return format

An array of one object (the new type) with the following keys and values:

- **id** — Auto-incrementing ID number for the record in the database.
- **type_label** — Type label.

***

## Example

**Request (Using JWT)**

```
https://poke150-api.herokuapp.com/api/v1/types/
```

**Return**

`status: 201`

```json

```
