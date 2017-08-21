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
		query: params => http.get(path, { params }),
		get: (id, params) => http.get(path + '/' + id, { params }),
		create: obj => http.post(path, obj),
		update: (id, obj) => http.put(path + '/' + id, obj),
		delete: id => http.delete(path + '/' + id)
	}
	return Object.assign(obj, actions)
}
