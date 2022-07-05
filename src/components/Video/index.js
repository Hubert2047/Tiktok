/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReportIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { useVideoPageRoute } from '~/hooks'
import { toastActions } from '~/redux/toastSlice'
import VideoFooter from '../VideoFooter'
import styles from './Video.module.scss'
const clsx = classNames.bind(styles)
function Video({ post, className, onMouseEnter, isCurrentPostPlaying }) {
    console.log('re-render video', post.id)
    const isPageActive = useSelector((state) => state.home.isPageActive)
    const dispath = useDispatch()
    // const [loaded, setLoaded] = useState(false)
    const videoRef = useRef()
    useEffect(() => {
        if (!videoRef.current) return
        if (isCurrentPostPlaying && isPageActive) {
            videoRef.current.play()
            return
        }
        // console.log('Loading video', post.id)
        videoRef.current.pause()
    }, [isCurrentPostPlaying, isPageActive])
    const navigate = useNavigate()
    const handleNavigate = function (e) {
        e.preventDefault()
        navigate(useVideoPageRoute(post))
    }
    const handleReport = function (e) {
        e.stopPropagation()
        dispath(toastActions.addToast({ message: 'Reported!', mode: 'success' }))
    }
    const handleOnloadedData = function () {
        if (!isCurrentPostPlaying) videoRef.current.pause()
        // setLoaded(true)
        // console.log('run')
    }
    return (
        <div onMouseEnter={onMouseEnter} className={clsx('wrapper', 'd-flex', className)}>
            <div onClick={handleNavigate} className={clsx('video-box')}>
                <Image
                    src={post.poster || ''}
                    className={clsx('poster', { 'display-poster': !isCurrentPostPlaying })}
                />
                <video
                    ref={videoRef}
                    webkit-playsinline='true'
                    playsInline={true}
                    autoPlay={true}
                    preload='none'
                    onLoadedData={handleOnloadedData}
                    // muted='muted'
                    // controlsList='nofullscreen'
                    className={clsx('video')}
                    loop
                    src={post.video}
                    controls></video>

                <div onClick={handleReport} className={clsx('report-box')}>
                    <ReportIcon />
                    <span>Report</span>
                </div>
            </div>
            <VideoFooter post={post} className={clsx('video-footer')} />
        </div>
    )
}

export default memo(Video)
