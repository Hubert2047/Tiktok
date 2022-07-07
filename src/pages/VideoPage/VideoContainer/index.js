import classNames from 'classnames/bind'
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { ReportIcon, StartIcon, XIcon } from '~/components/Icons'
import Spiner from '~/mobile/components/MobileVideoFooter/Spiner/Spiner'
import { toastActions } from '~/redux/toastSlice'
import styles from './VideoContainer.module.scss'
const clsx = classNames.bind(styles)
let time
function VideoContainer({ post, isPlaying, onObserver, scrollCommentRef, className }, ref) {
    const dispath = useDispatch()
    const videoRef = useRef()
    const observer = useRef()
    const [showStartBtn, setShowStartBtn] = useState(false)
    const [start, setStart] = useState(false)
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
        if (isPlaying) {
            videoRef.current.play()
            setStart(true)
        } else {
            videoRef.current.pause()
            setStart(false)
        }
    }, [isPlaying])
    const handleOnLoadedData = function () {
        if (!videoRef.current) videoRef.current.pause()
    }
    const handleStartVideo = function (startVideo) {
        if (!startVideo) {
            videoRef.current.pause()
            setStart(startVideo)
        } else {
            videoRef.current.play()
            setStart(startVideo)

            setShowStartBtn(true)
            setTimeout(() => {
                setShowStartBtn(false)
            }, 1000)
        }
    }
    const handleWatchComment = function (e) {
        e.stopPropagation()
        handleStartVideo(false)
        if (scrollCommentRef.current) scrollCommentRef.current.scrollIntoView({ behavior: 'smooth' })
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
                <Spiner isPlaying={start} post={{ ...post, user: post.postUser }} className={clsx('spiner')} />
            </div>
            <div className={clsx('top-box', 'd-flex')}>
                <Button
                    onClick={handleGoBackHome}
                    icon={<XIcon />}
                    type='btn-all-rounded'
                    className={clsx('close-btn')}
                />
                <Button
                    onClick={handleWatchComment}
                    title='Watch comments'
                    className={clsx('watch-comment')}
                    color='color-white'
                />
                <Button
                    title='Report'
                    color={'color-white'}
                    icon={<ReportIcon />}
                    onClick={handleOnReport}
                    className={clsx('report-btn')}
                />
            </div>
        </div>
    )
}

export default memo(forwardRef(VideoContainer))
