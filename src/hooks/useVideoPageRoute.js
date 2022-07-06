import config, { routeConstain } from '~/config'

function useVideoPageRoute(post) {
    return config.routes.video({
        params1: post.user[routeConstain.VIDEO_PARAMS1],
        params2: post.user[routeConstain.VIDEO_PARAMS2],
        params3: post[routeConstain.VIDEO_PARAMS3],
    })
}

export default useVideoPageRoute
