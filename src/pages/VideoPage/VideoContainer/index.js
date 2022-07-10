import classNames from 'classnames/bind'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { NextIcon, PrevIcon, ReportIcon, StartIcon, XIcon } from '~/components/Icons'
import VideoControl from '~/components/VideoControl'
import MobileSidebar from '~/mobile/components/MobileSidebar'
import Spiner from '~/mobile/components/MobileVideoFooter/Spiner/Spiner'
import { toastActions } from '~/redux/toastSlice'
import styles from './VideoContainer.module.scss'
const clsx = classNames.bind(styles)
let time
function VideoContainer(
    {
        //video use
        post,
        index,
        handleChangeVideoOnIndex,
        isCurrentVideoPlaying,
        onObserver,
        handleWatchComment,
        postLenght,

        //mobile sidebar and spiner use
        commentCount,
        isLikedPost,
        currentPlayVideo,
        setPosts,
        handleLikePostAction,

        className,
    },
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
                        onObserver(post.id, index)
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
        if (isCurrentVideoPlaying) {
            setStart(true)
            videoRef.current.play()
            videoRef.current.scrollIntoView({ behavior: 'smooth' })
        } else {
            setStart(false)
            videoRef.current.pause()
        }
    }, [isCurrentVideoPlaying])
    const handleOnLoadedData = function (e) {
        if (!videoRef.current) videoRef.current.pause()
    }
    const handleStartVideo = function (startVideo) {
        if (startVideo) {
            //handle show start btn
            setShowStartBtn(true)
            setTimeout(() => {
                setShowStartBtn(false)
            }, 1000)
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
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
                        isLikedPost={isLikedPost}
                        handleLikePostAction={handleLikePostAction}
                        setPosts={setPosts}
                        commentCount={commentCount}
                        handleWatchComment={handleWatchComment}
                    />
                    <Spiner
                        isCurrentVideoPlaying={start}
                        post={{ ...post, user: post.postUser }}
                        className={clsx('spiner')}
                    />
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
            <div className={clsx('switch-control', 'd-flex')}>
                {index !== 0 && (
                    <div
                        onClick={(e) => {
                            handleChangeVideoOnIndex(e, index, 'prev')
                        }}
                        className={clsx('switch-icon-box', 'flex-center')}>
                        <NextIcon className={clsx('next-icon')} />
                    </div>
                )}
                {index < postLenght - 1 && (
                    <div
                        onClick={(e) => {
                            handleChangeVideoOnIndex(e, index, 'next')
                        }}
                        className={clsx('switch-icon-box', 'flex-center')}>
                        <PrevIcon className={clsx('prev-icon')} />
                    </div>
                )}
            </div>
            {videoRef.current && isCurrentVideoPlaying && <VideoControl video={videoRef.current} />}
        </div>
    )
}

export default memo(forwardRef(VideoContainer))
