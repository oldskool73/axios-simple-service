import Resource from '../dist'

describe('Resource', () => {
  let path, params, config, http, res

  beforeEach(() => {
    path = '/foo'
    params = { foo: 'bar' }
    config = { fizz: 'buzz' }
    http = {
      // eslint-disable-next-line no-unused-vars
      get: (params, opts) => {},
      // eslint-disable-next-line no-unused-vars
      post: (params, opts) => {},
      // eslint-disable-next-line no-unused-vars
      put: (params, opts) => {},
      // eslint-disable-next-line no-unused-vars
      delete: (params, opts) => {}
    }
    res = Resource(path, http)
  })

  it('should be extendable', () => {
    let ext = { foo: function() {} }
    res = Resource(path, http, ext)
    expect(typeof res.foo).toBe('function')
  })

  describe('`query` method', () => {
    it('should exist', () => {
      expect(typeof res.query).toBe('function')
    })
    it('should call `http.get` and pass params', () => {
      spyOn(http, 'get')
      res.query(params, config)
      expect(http.get).toHaveBeenCalledWith(
        path, 
        Object.assign(config, {params})
      )
    })
  })

  describe('`get` method', () => {
    it('should exist', () => {
      expect(typeof res.get).toBe('function')
    })
    it('should call `http.get` with an id and params', () => {
      spyOn(http, 'get')
      res.get(1, params, config)
      expect(http.get).toHaveBeenCalledWith(path + '/1', Object.assign(config, {params}))
    })
  })

  describe('`create` method', () => {
    it('should should exist', () => {
      expect(typeof res.create).toBe('function')
    })
    it('should call `http.post` with data', () => {
      spyOn(http, 'post')
      res.create(params, config)
      expect(http.post).toHaveBeenCalledWith(path, params, config)
    })
  })

  describe('`update` method', () => {
    it('should should exist', () => {
      expect(typeof res.update).toBe('function')
    })
    it('should call `http.put` with data', () => {
      spyOn(http, 'put')
      res.update(1, params, config)
      expect(http.put).toHaveBeenCalledWith(path + '/1', params, config)
    })
  })

  describe('`delete` method', () => {
    it('should should exist', () => {
      expect(typeof res.delete).toBe('function')
    })
    it('should call `http.put` with data', () => {
      spyOn(http, 'delete')
      res.delete(1, config)
      expect(http.delete).toHaveBeenCalledWith(path + '/1', config)
    })
  })
})
