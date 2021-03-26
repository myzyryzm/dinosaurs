<!-- @format -->

# Dinosaurs

## Set Up

`yarn` : installs all the relevant node modules \
`yarn build` : creates the out/main.wasm file \
`yarn test` : runs the main.spec.ts file in assembly/\_\_tests\_\_

## NEAR

`near dev-deploy out/main.wasm` : deploys the contract

### View Methods

`near view $ACCOUNT_ID getAllDinosaurs` : returns a list of all dinosaurs\
`near view $ACCOUNT_ID getDinosaurById '{"id": $DINOSAUR_ID}'` : gets a dinosaur by id\
`near view $ACCOUNT_ID getDinosaursForOwner '{"owner": $OWNER_NAME}'` : gets all dinosaurs for a specific account

### Change Methods

`near call $ACCOUNT_ID createDinosaur '{"name": $DINOSAUR_NAME}' --account_id $YOUR_ACCOUNT` : creates a dinosaur with the specified name and assigns the owner of the dinosaur to $YOUR_ACCOUNT\
`near call $ACCOUNT_ID deleteDinosaur '{"id": $DINOSAUR_ID}' --account_id $YOUR_ACCOUNT` : deletes a dinosaur with the specified id\
`near call $ACCOUNT_ID transferDinosaur '{"newOwner": $OWNER_ACCOUNT, "id": $DINOSAUR_ID}' --account_id $YOUR_ACCOUNT` : transfers a dinosaur from $YOUR_ACCOUNT to $OWNER_ACCOUNT
