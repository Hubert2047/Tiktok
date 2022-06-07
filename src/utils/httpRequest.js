import axios from 'axios'
export const httpRequestF8 = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    timeout: 1000,
})
export const get = async function (path, q, type) {
    try {
        const request = await httpRequestF8(path, {
            params: {
                q,
                type,
            },
        })
        return request.data.data
    } catch (err) {
        throw new Error(err.message)
    }
}
