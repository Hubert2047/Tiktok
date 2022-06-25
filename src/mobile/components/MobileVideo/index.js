import classNames from 'classnames/bind'
import { forwardRef, memo, useEffect, useRef, useState } from 'react'
import MobileSidebar from '../MobileSidebar'
import MobileVideoFooter from '../MobileVideoFooter'
import styles from './MobileVideo.module.scss'

const clsx = classNames.bind(styles)

const MobileVideo = forwardRef(({ post, className, onPlay, isCurrentPostPlaying }, ref) => {
    console.log('re-render mobilevideo', post.id)
    const [play, setPlay] = useState()
    const videoRef = useRef()
    const observer = useRef()
    useEffect(() => {
        if (isCurrentPostPlaying) {
            setPlay(true)
            // videoRef.current.play()
        } else {
            setPlay(false)
            // videoRef.current.pause()
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
            setPlay(false)
        } else {
            videoRef.current.play()
            setPlay(true)
        }
    }

    return (
        <div ref={ref} onClick={handleVideoPress} className={clsx('wrapper', className)}>
            <div className={clsx('video-box')}>
                <video
                    ref={videoRef}
                    // autoPlay={true}
                    loop={true}
                    poster={post.poster}
                    className={clsx('video')}
                    src={post.video}></video>
            </div>
            <MobileSidebar className={clsx('mobile-sidebar')} post={post} />
            <MobileVideoFooter className={clsx('video-footer')} post={post} play={play} />
        </div>
    )
})

export default memo(MobileVideo)
