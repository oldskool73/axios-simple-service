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
export default function resource(path, http, actions = {}) {
	let obj = {
		query: (params, conf = {}) => http.get(path, Object.assign(conf, { params })),
		get: (id, params, conf = {}) => http.get(path + '/' + id, Object.assign(conf, { params })),
		create: (obj, conf = {}) => http.post(path, obj, conf),
		update: (id, obj, conf = {}) => http.put(path + '/' + id, obj, conf),
		delete: (id, conf = {}) => http.delete(path + '/' + id, conf)
	}
	return Object.assign(obj, actions)
}
