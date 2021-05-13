git clone https://github.com/covalence-io/barebones-react-typescript-express.git 3-cov-lab-ts-chirper

npm install

rm -rf .git

npm i react-router react-router-dom @types/react-router-dom @types/react-router

## Day.js

ships with official type declarations for TypeScript in NPM package out of the box.

Install via NPM

npm install dayjs
Import and use in your Typescript file

import \* as dayjs from 'dayjs'
dayjs().format()

## uuid

npm install --save uuid @types/uuid

npm install --save react-icons @types/react-icons

## Andrew review

commit: Recover original chirpstore id, navigate to single chirp view from home

## Pendiente

implementar que el toggle de ver chirp sea una opcion en el chirp input
