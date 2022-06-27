import config, { routeConstain } from '~/config'

function useMessageRoute(user) {
    if (!user.uid) return
    return config.routes.messages({
        params1: user[routeConstain.MESSAGE_PARAMS1],
    })
}

export default useMessageRoute
