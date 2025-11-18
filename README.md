# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
source ./env.sh
GIT_USER=lkgarcia yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

Colour:
```
background: #18141D
primary: #7D17F2
primary (50% darker): #3F0C79 
primary (50% lighter): #BE8BF9 
secondary: #25c2a0
secondary (50% darker): #0a6054
secondary (50% loghter): #92e1d0
boarder: #1a2869
```