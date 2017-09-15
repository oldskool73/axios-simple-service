# Axios Simple Service

Create angular $resource / vue-resource like objects for interacting with RESTful services.

[![Build Status](https://travis-ci.org/oldskool73/axios-simple-service.svg?branch=master)](https://travis-ci.org/oldskool73/axios-simple-service)

## Install:

`yarn add axios-simple-service`

## Usage:

```

import axios from 'axios'
import service from 'axios-simple-service'

export const UserResource = service('/api/users', axios, {})

```

You can then interact with your resource like...

```

import UserResource from './UserResource'

let users = UserResource.query({active: true}) // get `api/users?active=true`
let user = UserResource.get(1) // get `api/users/1`
UserResource.create({email:'foo@bar.com', name: 'foo'}) // post `api/users`
UserResource.update(1, {name: 'bar'}) // put `api/users/1`
UserResource.delete(1) // delete `api/users/1`

```

### Service Parameters

`service(URI, Axios, [Custom Resources])`


* URL (required)

Url to the service, e.g. `/api/users` etc

* Axios (required)

Reference to the Axios instance

* Custom Resources (optional)

You can add additional 'custom' methods at creation time, e.g...

```

const UserResource = resource('/users', axios, {
  active: () => axios.get('/users', {
    active: true
  })
})

...

let activeUsers = UserResource.active()

```

### Promises

All methods return the axios instance for promise chaining...

```

let users = UserResource.query()
  .then(res => res.data.user)
  .catch(err => console.error(err))

```

---

### Notes :

* Yes, this should probably be called `axios-simple-resource`, but it was late and I'm an idiot and added it to npm with the wrong name, so .... 

### Credits

Idea taken from @howareyouo response : https://github.com/mzabriskie/axios/issues/894
