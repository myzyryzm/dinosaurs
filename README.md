<!-- @format -->

# Near Pokemon

## Set Up

`yarn` : installs all the relevant node modules \
`yarn build` : creates the out/main.wasm file \
`yarn test` : runs the main.spec.ts file in assembly/\_\_tests\_\_

## NEAR

`near dev-deploy out/main.wasm` : deploys the contract

### View Methods

`near view $CONTRACT getAllPokemon` : returns a list of all pokemon\
`near view $CONTRACT getPokemonById '{"id": $POKEMON_ID}'` : gets a pokemon by id\
`near view $CONTRACT getPokemonByOwner '{"owner": $OWNER_NAME}'` : gets all pokemon for a specific account

### Change Methods

`near call $CONTRACT createPokemon '{"nickname": $POKEMON_NAME}' --account_id $YOUR_ACCOUNT` : creates a pokemon with the specified name and assigns the owner of the pokemon to $YOUR_ACCOUNT\
`near call $CONTRACT deletePokemon '{"id": $POKEMON_ID}' --account_id $YOUR_ACCOUNT` : deletes a pokemon with the specified id\
`near call $CONTRACT transferPokemon '{"newOwner": $OWNER_ACCOUNT, "id": $POKEMON_ID}' --account_id $YOUR_ACCOUNT` : transfers a pokemon from $YOUR_ACCOUNT to $OWNER_ACCOUNT\
`near call $CONTRACT trainPokemon '{"id": $POKEMON_ID, "cpuLevel": $CPU_LEVEL}' --account_id $YOUR_ACCOUNT` : trains a pokemon with id of $POKEMON_ID from $YOUR_ACCOUNT against a random cpu at level $CPU_LEVEL\
`near call $CONTRACT healPokemon '{"id": $POKEMON_ID}' --account_id $YOUR_ACCOUNT` : heals a pokemon with id of $POKEMON_ID from $YOUR_ACCOUNT to full health
