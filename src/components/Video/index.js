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
function Video({ post, isPlaying, className, onMouseEnter }) {
    // console.log('re-render video')
    const videoRef = useRef()
    useEffect(() => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isPlaying])
    const navigate = useNavigate()
    const handleNavigate = function (e) {
        e.preventDefault()
        navigate(useVideoPageRoute(post))
    }
    return (
        <div onMouseEnter={onMouseEnter} className={clsx('wrapper', 'd-flex', className)}>
            <div onClick={handleNavigate} className={clsx('video-box')}>
                {/* <Image src={post.poster || ''} className={clsx('poster')} /> */}
                <video
                    ref={videoRef}
                    autoPlay={true}
                    // controlsList='nofullscreen'
                    className={clsx('video')}
                    loop={true}
                    src={post.video}
                    controls={true}></video>

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
