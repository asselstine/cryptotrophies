# Setup

### Install NPM, Direnv

`brew install node`
`brew install npm`
`brew install direnv`

### NPM packages:

`npm install`

### Environment Variables

`cp .envrc.example .envrc`

Enter your own twelve random words in the .envrc, then use `direnv allow` to export the env vars.

### Ganache

Create a directory for Ganache to store in:

`mkdir .ganache`

### Compile the Solidity code

`truffle compile`

### Migrate the Contracts

This project is using a different migration tool:

`truffle-migrate-off-chain`

# Run the Project

Make sure the truffle contracts are compiled and migrated. Then to run the project locally run the commands:

./ganache.sh
./lambda-serve.sh
npm run dev
```
