import classNames from 'classnames/bind'
import { forwardRef, memo, useRef, useState } from 'react'
import MobileSidebar from '../MobileSidebar'
import MobileVideoFooter from '../MobileVideoFooter'
import styles from './MobileVideo.module.scss'

const clsx = classNames.bind(styles)

const MobileVideo = forwardRef(({ post, className, onPlay, isPlaying }, ref) => {
    const [play, setPlay] = useState(false)
    const videoRef = useRef()
    const handleVideoPress = function () {
        if (play) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
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
            <MobileVideoFooter className={clsx('video-footer')} post={post} />
        </div>
    )
})

export default memo(MobileVideo)
