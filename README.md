[![CodeFactor](https://www.codefactor.io/repository/github/danitetus/pushover-js/badge)](https://www.codefactor.io/repository/github/danitetus/pushover-js)

# pushover-js

A Node JS module written in Typescript to use with Pushover notifications app

---

## Breaking changes from v0.x.x

This entire library has been rewritten to be based on promises.

The code has been restructured and the methods changed to make it more complete and versatile.

If you were using a version of the 0.x.x branch, please check the documentation to adapt your code.

---

## Installation

```bash
npm install --save pushover-js
```

---

## Usage

### Callbacks

```javascript
/*
        JAVASCRIPT
*/

// Load the module
var Pushover = require( 'pushover-js').Pushover;

// Instance
const pushover = new Pushover('user', 'token')

// Simple notification (without personalization)
pushover
    .send('My title', 'My message')
        .then(console.log)
        .catch(console.error)

// Custom notification
pushover
    // Setting the sound
    .setSound('cashregister')
    // If the priority is 2, you have to provide an expire time and a retry time (see the official API for more info)
    .setPriority(2, 60, 30)
    // Set an url to access on tap
    .setUrl('https://www.github.com/danitetus/pushover-js', 'Pushover-JS github')
    // Send
    .send('Submit an issue', 'Click on the link to submit an issue')
  .then((msj) => {
    console.log(msj)
  })
  .catch((e) => {
    console.error(e)
  })
```

```typescript
/*
        TYPESCRIPT
*/

// Load the module
import { Pushover } from 'pushover-js'

// Instance
const pushover = new Pushover('user', 'token')

// Simple notification (without personalization)
pushover
    .send('My title', 'My message')
        .then(console.log)
        .catch(console.error)

// Custom notification
pushover
    // Setting the sound
    .setSound('cashregister')
    // If the priority is 2, you have to provide an expire time and a retry time (see the official API for more info)
    .setPriority(2, 60, 30)
    // Set an url to access on tap
    .setUrl('https://www.github.com/danitetus/pushover-js', 'Pushover-JS github')
    // Send
    .send('Submit an issue', 'Click on the link to submit an issue')
  .then((msj) => {
    console.log(msj)
  })
  .catch((e) => {
    console.error(e)
  })
```

### Async/await

```typescript
// Load the module
import { Pushover } from 'pushover-js'


// Use this inside an async function
const sendNotification = async () => {
    // Instance
    const pushover = new Pushover('user', 'token')

    // Custom notification
    pushover
        // Setting the sound
        .setSound('cashregister')
        // If the priority is 2, you have to provide an expire time and a retry time (see the official API for more info)
        .setPriority(2, 60, 30)
        // Set an url to access on tap
        .setUrl('https://www.github.com/danitetus/pushover-js', 'Pushover-JS github')

    try {
        const response = await Pushover.send('Submit an issue', 'Click on the link to submit an issue')
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

```

## Known limitations

At the moment it is not possible to send attachments with this library, but if you need it, I will think about implement it.

For any suggestion or issue, please go to the [issues section](http://www.github.com/danitetus/pushover-js) on the [Github repository](https://www.github.com/danitetus/pushover-js)
