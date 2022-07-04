import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function usePortalContainer(style) {
    const [loaded, setLoaded] = useState(false)
    const [portalId] = useState(uuidv4())
    useEffect(() => {
        const div = document.createElement('div')
        div.id = portalId
        div.style = style
        document.getElementsByTagName('body')[0].prepend(div)
        setLoaded(true)
        return () => document.getElementsByTagName('body')[0].removeChild(div)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portalId])
    return [loaded, portalId]
}

export default usePortalContainer
