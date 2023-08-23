## Summary

This is the client-side of my solution to solve Potloc's challenge.

### Features
* Allows the user to see in real-time the inventory status of all the shoes models and stores feeded by [shoe-store](https://github.com/mathieugagne/shoe-store). 
* Shows notifications of High stock, Low stock and No stock per store-shoes model.
* Allows to download a historical report in spreadsheet format which is basically a DB dump of the _notifications_ received.

### Technologies used:
* NodeJS (v18.16.0)
* Typescript
* NextJS
* Jest
* React Testing Library


## Getting Started
First, make sure to install Node's dependencies with: 
```bash
npm i
```

Second, run the development server:
```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> NOTE: Make sure to start the [shoe-store](https://github.com/mathieugagne/shoe-store) project to feed this client.