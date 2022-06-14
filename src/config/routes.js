const profile = function (route) {
    return route ? `/${route.params1}/${route.params2}` : `/:${PROFILE_PARAMS1}/:${PROFILE_PARAMS2}`
}
export const PROFILE_PARAMS1 = 'full_name'
export const PROFILE_PARAMS2 = 'uid'
const routes = {
    home: '/',
    following: '/following',
    upload: '/upload',
    profile: profile,
    // profile: '@:full_name/:uid',
    video: '/:name/video/:postId',
}

export default routes
