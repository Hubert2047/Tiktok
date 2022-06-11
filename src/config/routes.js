const profile = function (route) {
    return route ? `/@:${route}` : '/@:route'
}
export const PROFILE_ROUTE = 'full_name'
const routes = {
    home: '/',
    following: '/following',
    upload: '/upload',
    profile: profile,
    video: ':name/video/:id',
}

export default routes
