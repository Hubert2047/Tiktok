import classNames from 'classnames/bind'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { ReportIcon, XIcon } from '~/components/Icons'
import { toastActions } from '~/redux/toastSlice'
import styles from './VideoContainer.module.scss'
const clsx = classNames.bind(styles)
let time
function VideoContainer({ post, isPlaying, onObserver, isFirstTimePlay, setIsFirestTimePlay, className }) {
    const dispath = useDispatch()
    const videoRef = useRef()
    const observer = useRef()
    const handleOnReport = function () {
        dispath(toastActions.addToast({ message: 'Reported!', mode: 'success' }))
    }
    function handleGoBackHome() {
        window.history.back()
    }
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
        } else {
            videoRef.current.pause()
        }
    }, [isPlaying])
    const handleOnLoadedData = function () {
        if (!videoRef.current) videoRef.current.pause()
    }
    return (
        <div className={clsx('wrapper')}>
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
            <Button onClick={handleGoBackHome} icon={<XIcon />} type='btn-all-rounded' className={clsx('close-btn')} />
            <Button
                title='Report'
                color={'color-white'}
                icon={<ReportIcon />}
                onClick={handleOnReport}
                className={clsx('report-btn')}
            />
        </div>
    )
}

export default VideoContainer
