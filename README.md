<!-- @format -->

# Dinosaurs

## Set Up

`yarn` : installs all the relevant node modules \
`yarn build` : creates the out/main.wasm file \
`yarn test` : runs the main.spec.ts file in assembly/\_\_tests\_\_

## NEAR

`near dev-deploy out/main.wasm` : deploys the contract \
`near view $ACCOUNT_ID getAllDinosaurs` : returns a list of all dinosaurs\
`near call $ACCOUNT_ID createDinosaur '{"name": $DINOSAUR_NAME}' --account_id $YOUR_ACCOUNT` : creates a dinosaur with the specified name and assigns the owner of the dinosaur to $YOUR_ACCOUNT
