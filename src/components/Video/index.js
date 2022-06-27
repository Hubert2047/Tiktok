/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { memo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReportIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { useVideoPageRoute } from '~/hooks'
import VideoFooter from '../VideoFooter'
import styles from './Video.module.scss'
const clsx = classNames.bind(styles)
function Video({ post, className, onMouseEnter, isCurrentPostPlaying }) {
    // console.log('re-render video', post.id)
    const videoRef = useRef()
    useEffect(() => {
        if (!videoRef.current) return
        if (isCurrentPostPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isCurrentPostPlaying])
    const navigate = useNavigate()
    const handleNavigate = function (e) {
        e.preventDefault()
        navigate(useVideoPageRoute(post))
    }
    return (
        <div onMouseEnter={onMouseEnter} className={clsx('wrapper', 'd-flex', className)}>
            <div onClick={handleNavigate} className={clsx('video-box')}>
                <Image src={post.poster || ''} className={clsx('poster')} />
                <video
                    ref={videoRef}
                    webkit-playsinline='true'
                    playsInline={true}
                    autoPlay={true}
                    // muted='muted'
                    // controlsList='nofullscreen'
                    className={clsx('video')}
                    loop
                    src={post.video}
                    controls></video>

                <div className={clsx('report-box')}>
                    <ReportIcon />
                    <span>Report</span>
                </div>
            </div>
            <VideoFooter post={post} className={clsx('video-footer')} />
        </div>
    )
}

export default memo(Video)
