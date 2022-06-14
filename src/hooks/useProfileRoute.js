import config from '~/config'

function useProfileRoute(user) {
    return config.routes.profile({ params1: user[config.PROFILE_PARAMS1], params2: user[config.PROFILE_PARAMS2] })
}

export default useProfileRoute
