'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resource;
/**
 * create vue-resource's resource like object
 * taken from : https://github.com/mzabriskie/axios/issues/894
 *
 * You can add to the default actions by passing an object on creation, eg...
 *
 * ```
 * const post = resource('/posts', axiosInstance, {
 *  paging: (params) => axiosInstance.get('/posts', {
 *       params
 *   })
 * })
 * ```
 *
 * @param string path       the resource path
 * @param object http       axios instance
 * @param object actions    custom actions
 * @return object           the resource object
 */
function resource(path, http) {
  var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var obj = {
    query: function query() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return http.get(path, Object.assign(conf, { params: params }));
    },
    get: function get(id) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var conf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return http.get(path + '/' + id, Object.assign(conf, { params: params }));
    },
    create: function create(obj) {
      var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return http.post(path, obj, conf);
    },
    update: function update(id, obj) {
      var conf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return http.put(path + '/' + id, obj, conf);
    },
    delete: function _delete(id) {
      var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return http.delete(path + '/' + id, conf);
    }
  };
  return Object.assign(obj, actions);
}
