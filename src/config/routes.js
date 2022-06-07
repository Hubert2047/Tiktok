const profile = function (nickname) {
    return nickname ? `/@:${nickname}` : '/@:nickname'
}
const routes = {
    home: '/',
    following: '/following',
    upload: '/upload',
    profile: profile,
}

export default routes
