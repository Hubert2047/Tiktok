/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReportIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { useVideoPageRoute } from '~/hooks'
import { homeActions } from '~/redux/homeSlice'
import VideoFooter from '../VideoFooter'
import styles from './Video.module.scss'

const clsx = classNames.bind(styles)
function Video({ post, className, onMouseEnter }) {
    // console.log('re-render video')
    const dispath = useDispatch()
    const currentPostPlayingId = useSelector((state) => state.home.currentPostPlayingId)

    const videoRef = useRef()
    const observer = useRef()
    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log('intersecting', post.id)
                    dispath(homeActions.setCurrentPostPlayingId(post.id))
                }
            },
            { threshold: 1 }
        )
        if (videoRef.current) {
            observer.current.observe(videoRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (!videoRef.current) return
        if (currentPostPlayingId === post.id) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [currentPostPlayingId])
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
                    autoPlay
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
