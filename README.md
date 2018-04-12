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

# Run the Project

To run the project locally run the commands:

./ganache.sh
./lambda-serve.sh
npm run dev
```
