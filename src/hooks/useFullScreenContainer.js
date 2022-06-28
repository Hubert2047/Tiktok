import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function useFallScreenContainer() {
    const [portalId] = useState(uuidv4())
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const div = document.createElement('div')
        div.id = portalId
        div.style = 'position:fixed;top:0;left:0;width:100%,height:100%,z-index:9999'
        document.getElementsByTagName('body')[0].prepend(div)
        setLoaded(true)
        return () => {
            document.getElementsByTagName('body')[0].remove(div)
        }
    }, [portalId])
    return [portalId, loaded]
}

export default useFallScreenContainer
