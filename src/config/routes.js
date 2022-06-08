const profile = function (route) {
    return route ? `/@:${route}`:'/@:route'
}
export const PROFILE_ROUTE='full_name'
const routes = {
    home: '/',
    following: '/following',
    upload: '/upload',
    profile: profile,
}

export default routes
