import * as httpRequest from '~/utils/httpRequest'

export const searchUser = async function (query, type = 'less') {
    try {
        return await httpRequest.get('users/search', query, type)
    } catch (err) {
        throw new Error(err)
    }
}
