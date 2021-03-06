import config, { routeConstain } from '~/config'

function useProfileRoute(user) {
    if (!user.uid) return
    return config.routes.profile({
        params1: user[routeConstain.PROFILE_PARAMS1],
        params2: user[routeConstain.PROFILE_PARAMS2],
    })
}

export default useProfileRoute
