import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { usePortalContainer } from '~/hooks'
import { homeActions } from '~/redux/homeSlice'

function EffectApp() {
    const dispath = useDispatch()
    const [loaded, portalId] = usePortalContainer('position:fixed;top:0;left:0;')

    useEffect(() => {
        //check if page not active/change tab then stop play video
        const handleOnChangePageTab = function () {
            if (document.visibilityState === 'visible') {
                dispath(homeActions.setIsPageActive(true))
            } else {
                dispath(homeActions.setIsPageActive(false))
            }
        }
        document.addEventListener('visibilitychange', handleOnChangePageTab)

        return () => {
            document.removeEventListener('visibilitychange', handleOnChangePageTab)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return loaded ? ReactDOM.createPortal(<></>, document.getElementById(portalId)) : <></>
}

export default EffectApp
