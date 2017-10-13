# Poke150-API

Poke150-API provides access to a database of the original 150 pokemon and their corresponding primary types.

Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").

***

## Endpoints

#### Pokemon Resources

- **[<code>GET</code> pokemon](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/pokemon/GET_pokemon.md)**
- **[<code>GET</code> pokemon/:region_id](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/pokemon/GET_pokemon_regionId.md)**
- **[<code>POST</code> pokemon](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/pokemon/POST_pokemon.md)**
- **[<code>PATCH</code> pokemon](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/pokemon/PATCH_pokemon.md)**
- **[<code>DELETE</code> pokemon/:region_id](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/pokemon/DELETE_pokemon_regionId.md)**
- **[<code>DELETE</code> pokemon/:id](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/pokemon/DELETE_pokemon_Id.md)**


#### Types Resources

- **[<code>GET</code> types](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/types/GET_types.md)**
- **[<code>GET</code> types/:id](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/types/GET_types_Id.md)**
- **[<code>POST</code> types](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/types/POST_types.md)**
- **[<code>PUT</code> types/:id](https://github.com/lcaroselli/Poke150-api/blob/master/documentation/endpoints/types/PUT_types_Id.md)**


## FAQ
### How do I connect to the Poke150-API?
Through [Heroku](https://poke150-api.herokuapp.com/).

### What return formats do you support?
Poke150-API currently returns data in [JSON](http://json.org/ "JSON") format.

### What kind of authentication is required?
Applications must identify themselves to access any resource. You can authenticate yourself at the root of the application to generate a JWT.

### Is there a request rate limit?
There is not currently a rate limit.
