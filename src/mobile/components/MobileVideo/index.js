import classNames from 'classnames/bind'
import { forwardRef, memo, useEffect, useRef, useState } from 'react'
import MobileSidebar from '../MobileSidebar'
import MobileVideoFooter from '../MobileVideoFooter'
import styles from './MobileVideo.module.scss'

const clsx = classNames.bind(styles)

const MobileVideo = forwardRef(({ post, className, onPlay, isCurrentPostPlaying }, ref) => {
    console.log('re-render mobilevideo', post.id)
    const [play, setPlay] = useState(false)
    const [videoPlaying, setVideoPlaying] = useState()
    const videoRef = useRef()
    const observer = useRef()
    useEffect(() => {
        setVideoPlaying(isCurrentPostPlaying)
        if (isCurrentPostPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isCurrentPostPlaying])
    useEffect(() => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onPlay(post.id)
                }
            },
            { threshold: 1 }
        )
        if (videoRef.current) observer.current.observe(videoRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleVideoPress = function () {
        if (play) {
            videoRef.current.pause()
            setVideoPlaying(false)
        } else {
            videoRef.current.play()
            setVideoPlaying(true)
        }
        setPlay((prev) => !prev)
    }

    return (
        <div ref={ref} className={clsx('wrapper', className)}>
            <video
                onClick={handleVideoPress}
                ref={videoRef}
                loop={true}
                className={clsx('video')}
                src={post.video}></video>
            <MobileSidebar className={clsx('mobile-sidebar')} post={post} />
            <MobileVideoFooter className={clsx('video-footer')} post={post} videoPlaying={videoPlaying} />
        </div>
    )
})

export default memo(MobileVideo)
