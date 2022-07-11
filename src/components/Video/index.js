/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import classNames from 'classnames/bind'
import { increment } from 'firebase/firestore'
import { memo, useEffect, useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReportIcon, StartIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { updatePost } from '~/firebase'
import { useShowIconStart, useVideoOnScreen, useVideoPageRoute } from '~/hooks'
import { toastActions } from '~/redux/toastSlice'
import Loading from '../Loading'
import VideoControl from '../VideoControl'
import VideoFooter from '../VideoFooter'
import styles from './Video.module.scss'

const clsx = classNames.bind(styles)
function Video({ post, className }) {
    console.log('re-render video', post.id)
    const dispath = useDispatch()
    const isPageActive = useSelector((state) => state.home.isPageActive)
    const [isPlaying, setIsPlaying] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [isShowIconStart, setIsShowIconStart] = useState(false)

    const [doubleClick, setDoubleClick] = useState(false)

    const videoRef = useRef()

    const options = {
        threshold: 0.75,
    }
    const [isVideoOnScreen] = useVideoOnScreen(videoRef, options, post)
    // console.log(isVideoOnScreen)
    useEffect(() => {
        if (!videoRef.current) return
        const videoOnPlaying = function () {
            setLoading(true)
            if (videoRef.current.readyState === 4) {
                setLoading(false)
                setLoaded(true)
            }
        }
        videoRef.current.addEventListener('playing', videoOnPlaying)
        return () => {
            videoRef.current.removeEventListener('playing', videoOnPlaying)
        }
    }, [])
    useEffect(() => {
        if (isVideoOnScreen && isPageActive) {
            if (!isPlaying) {
                videoRef.current.play()
                setIsPlaying(true)
                useShowIconStart(setIsShowIconStart, 1000)
            }
        } else {
            if (isPlaying) {
                videoRef.current.pause()
                setIsPlaying(false)
            }
        }
    }, [isVideoOnScreen, isPageActive])

    const navigate = useNavigate()
    const handleReport = function (e) {
        e.stopPropagation()
        dispath(toastActions.addToast({ message: 'Reported!', mode: 'success' }))
    }
    const handleOnloadedData = function () {
        // if (!isCurrentPlaying) videoRef.current.pause()
        // setLoaded(true)
    }
    const handleOnVideoClick = function (start) {
        //handle double click
        if (doubleClick) {
            updatePost(post.id, { shares: increment(1), played: increment(1) })
            navigate(useVideoPageRoute(post))
            setIsPlaying(false)
            return
        }
        //handle start state
        if (start) {
            videoRef.current.play()
            useShowIconStart(setIsShowIconStart, 1000)
        } else {
            videoRef.current.pause()
        }
        setIsPlaying(start)
        //handle one click
        setDoubleClick(true)
        setTimeout(() => {
            setDoubleClick(false)
        }, 300)
    }
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div
                onClick={() => {
                    handleOnVideoClick(!isPlaying)
                }}
                className={clsx('video-box')}>
                {loading && (
                    <div className={clsx('loading-box', 'absolute-center')}>
                        <Loading />
                    </div>
                )}
                <Image
                    src={post.poster || ''}
                    className={clsx('poster', { 'display-poster': !isPlaying && !loaded })}
                />

                <video
                    ref={videoRef}
                    onLoadedData={handleOnloadedData}
                    className={clsx('video')}
                    loop
                    src={post.video}></video>

                <div onClick={handleReport} className={clsx('report-box')}>
                    <ReportIcon className={clsx('report-icon')} />
                    <span>Report</span>
                </div>

                <div className={clsx('play-box', 'd-flex')}>
                    {isPlaying ? (
                        <StartIcon className={clsx('start-icon', { 'start-animated': isShowIconStart })} />
                    ) : (
                        <IoPlay className={clsx('stop-icon')} />
                    )}
                </div>

                {videoRef?.current && <VideoControl video={videoRef.current} post={post} />}
            </div>
            <VideoFooter post={post} className={clsx('video-footer')} />
        </div>
    )
}

export default memo(Video)
