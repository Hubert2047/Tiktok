import React, { useEffect } from 'react'

function useOverflow() {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'visible'
        }
    }, [])
    return <></>
}

export default useOverflow
