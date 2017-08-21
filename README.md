# Axios Simple Service

Create angular $resource / vue-resource like objects for interacting with RESTful services.

---

## Install:

`yarn add axios-simple-service`

## Usage:

```
import axios from 'axios'
import resource from 'axios-simple-resource'

const userResource = () => resource('/api/user', axios, {})

export default userResource
```

You can then interact with your resource like...

```
import userResource from './userResource'

$users = userResource.query({active: true}) // get `api/user?active=true`
$user = userResource.get(1) // get `api/user/1`
userResource.create({email:'foo@bar.com', name: 'foo'}) // post `api/user`
userResource.update(1, {name: 'bar'}) // put `api/user/1`
userResource.delete(1) // delete `api/user/1`
```

You can creare additional methods at creation time, e.g...

```
const userResource = resource('/user', axios, {
  active: () => axios.get('/user', {
    active: true
  })
})

...

$activeUsers = userResource.active()
```

All methods return the axios instance for promise chaining...

```
$users = userResource
  .query()
  .then(res => this.users = res.data)
  .catch(err => console.error(err))

```

---

### Credits

Idea taken from @howareyouo response : https://github.com/mzabriskie/axios/issues/894
