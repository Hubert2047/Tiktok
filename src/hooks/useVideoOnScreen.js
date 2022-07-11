import { useEffect, useRef, useState } from 'react'

function useVideoOnScreen(videoRef, options = {}, post) {
    // console.log('re-render')
    const [visible, setVisible] = useState(false)
    const observerRef = useRef()
    const timeOutId = useRef()
    useEffect(() => {
        if (observerRef.current) observerRef.current.unobserve(videoRef.current)
        observerRef.current = new IntersectionObserver((entries) => {
            // const entry = [entries]
            if (entries[0].isIntersecting) {
                if (timeOutId) clearTimeout(timeOutId.current)
                timeOutId.current = setTimeout(() => {
                    setVisible(true)
                }, 300)
            } else {
                setVisible(false)
            }
        }, options)
        if (videoRef.current) {
            observerRef.current.observe(videoRef.current)
        }
    }, [videoRef, options])
    return [visible]
}

export default useVideoOnScreen
