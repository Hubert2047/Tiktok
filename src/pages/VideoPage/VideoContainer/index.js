import classNames from 'classnames/bind'
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { ReportIcon, StartIcon, XIcon } from '~/components/Icons'
import VideoControl from '~/components/VideoControl'
import MobileSidebar from '~/mobile/components/MobileSidebar'
import Spiner from '~/mobile/components/MobileVideoFooter/Spiner/Spiner'
import { toastActions } from '~/redux/toastSlice'
import styles from './VideoContainer.module.scss'
const clsx = classNames.bind(styles)
let time
function VideoContainer(
    { post, isPlaying, onObserver, className, handleWatchComment, currentPlayVideo, commentCount },
    ref
) {
    const dispath = useDispatch()
    const videoRef = useRef()
    const observer = useRef()
    const [showStartBtn, setShowStartBtn] = useState(false)
    const [start, setStart] = useState(true)
    const handleOnReport = function (e) {
        e.stopPropagation()
        dispath(toastActions.addToast({ message: 'Reported!', mode: 'success' }))
    }
    function handleGoBackHome() {
        window.history.back()
    }
    useImperativeHandle(ref, () => {
        return { handleStartVideo }
    })
    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (time) clearTimeout(time)
                    // console.log('intersecting', post.id)
                    time = setTimeout(() => {
                        // console.log('setime out run')
                        setStart(true)
                        onObserver(post.id)
                    }, 100) //wait 800 then dispath
                }
            },
            { threshold: 0.75 }
        )
        if (videoRef.current) {
            observer.current.observe(videoRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!videoRef.current) return
        if (isPlaying && start) {
            videoRef.current.play()
            setStart(true)
            setShowStartBtn(true)
            setTimeout(() => {
                setShowStartBtn(false)
            }, 1000)
        } else {
            videoRef.current.pause()
            setStart(false)
        }
    }, [isPlaying, start])
    const handleOnLoadedData = function () {
        if (!videoRef.current) videoRef.current.pause()
    }
    const handleStartVideo = function (startVideo) {
        setStart(startVideo)
    }

    return (
        <div
            onClick={() => {
                handleStartVideo(!start)
            }}
            className={clsx('wrapper', className)}>
            <div className={clsx('video-box')}>
                <video
                    key={post.id}
                    ref={videoRef}
                    loop={true}
                    onLoadedData={handleOnLoadedData}
                    // controls={true}
                    autoPlay={true}
                    className={clsx('video')}
                    src={post?.video}
                />
                <div className={clsx('actions')}>
                    {/* {start ? <StartIcon className={clsx('start-icon')} /> : <IoPlay className={clsx('stop-icon')} />} */}
                    {!start && <IoPlay className={clsx('stop-icon')} />}
                    {start && <StartIcon className={clsx('start-icon', { 'show-opacity': showStartBtn })} />}
                </div>

                <div className={clsx('video-sidebar')}>
                    <MobileSidebar
                        post={currentPlayVideo}
                        commentCount={commentCount}
                        handleWatchComment={handleWatchComment}
                    />
                    <Spiner isPlaying={start} post={{ ...post, user: post.postUser }} className={clsx('spiner')} />
                </div>
            </div>
            <div className={clsx('top-box', 'd-flex')}>
                <Button
                    onClick={handleGoBackHome}
                    icon={<XIcon />}
                    type='btn-all-rounded'
                    className={clsx('close-btn')}
                />
                <Button
                    title='Report'
                    color={'color-white'}
                    icon={<ReportIcon />}
                    onClick={handleOnReport}
                    className={clsx('report-btn')}
                />
            </div>
            {videoRef.current && isPlaying && <VideoControl video={videoRef.current} />}
        </div>
    )
}

export default memo(forwardRef(VideoContainer))
