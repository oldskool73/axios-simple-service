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
    query: function query(params) {
      return http.get(path, { params: params });
    },
    get: function get(id, params) {
      return http.get(path + '/' + id, { params: params });
    },
    create: function create(obj) {
      return http.post(path, obj);
    },
    update: function update(id, obj) {
      return http.put(path + '/' + id, obj);
    },
    delete: function _delete(id) {
      return http.delete(path + '/' + id);
    }
  };
  return Object.assign(obj, actions);
}
