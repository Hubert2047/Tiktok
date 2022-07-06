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
import { useVideoPageRoute } from '~/hooks'
import { toastActions } from '~/redux/toastSlice'
import VideoFooter from '../VideoFooter'
import styles from './Video.module.scss'

const clsx = classNames.bind(styles)
function Video({ post, isCurrentPlaying, className }) {
    // console.log('re-render video', post.id)
    const isPageActive = useSelector((state) => state.home.isPageActive)
    const dispath = useDispatch()
    const [start, setStart] = useState(false)
    // const [loaded, setLoaded] = useState(false)
    const videoRef = useRef()
    useEffect(() => {
        if (!videoRef.current) return
        if (isCurrentPlaying && isPageActive && videoRef.current.paused) {
            setStart(true)
            videoRef.current.play()
            return
        }
        videoRef.current.pause()
        setStart(true)
    }, [isCurrentPlaying, isPageActive])

    const navigate = useNavigate()
    const handleNavigate = async function (e) {
        e.preventDefault()
        updatePost(post.id, { shares: increment(1), played: increment(1) })
        navigate(useVideoPageRoute(post))
    }
    const handleReport = function (e) {
        e.stopPropagation()
        dispath(toastActions.addToast({ message: 'Reported!', mode: 'success' }))
    }
    const handleOnloadedData = function () {
        if (!isCurrentPlaying) videoRef.current.pause()
        // setLoaded(true)
    }
    const handleStartVideo = function () {
        if (start) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setStart((prev) => !prev)
    }
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div onClick={handleNavigate} className={clsx('video-box')}>
                <Image src={post.poster || ''} className={clsx('poster', { 'display-poster': !isCurrentPlaying })} />
                <video
                    ref={videoRef}
                    webkit-playsinline='true'
                    playsInline={true}
                    autoPlay={true}
                    onLoadedData={handleOnloadedData}
                    // muted='muted'
                    // controlsList='nofullscreen'
                    className={clsx('video')}
                    loop
                    src={post.video}></video>

                <div onClick={handleReport} className={clsx('report-box')}>
                    <ReportIcon />
                    <span>Report</span>
                </div>
            </div>
            <div onClick={handleStartVideo} className={clsx('start-icon-box')}>
                {start ? <StartIcon className={clsx('start-icon')} /> : <IoPlay className={clsx('stop-icon')} />}
            </div>
            <VideoFooter post={post} className={clsx('video-footer')} />
        </div>
    )
}

export default memo(Video)
