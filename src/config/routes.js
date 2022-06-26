const profile = function (route = null) {
    return route ? `/${route.params1}/${route.params2}` : `/:${PROFILE_PARAMS1}/:${PROFILE_PARAMS2}`
}
const video = function (route) {
    return route ? `/${route.params1}/video/${route.params2}` : `/:${VIDEO_PARAMS1}/video/:${VIDEO_PARAMS2}`
}
export const PROFILE_PARAMS1 = 'full_name'
export const PROFILE_PARAMS2 = 'uid'
export const VIDEO_PARAMS1 = 'full_name'
export const VIDEO_PARAMS2 = 'id'
const routes = {
    home: '/',
    following: '/following',
    upload: '/upload',
    profile: profile,
    video: video,
    messages: 'messages',
}

export default routes
