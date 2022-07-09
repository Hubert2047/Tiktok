/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { increment } from 'firebase/firestore'
import { memo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PlayIcon, StartIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { updatePost } from '~/firebase'
import { formatCountNumber } from '~/helper'
import { useVideoPageRoute } from '~/hooks'
import { toastActions } from '~/redux/toastSlice'
import styles from './MovieCard.module.scss'
const clsx = classNames.bind(styles)
let toastTimeoutId
function MovieCard({ post, isPlaying, onMovieActive, clientWidth }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const hoverRef = useRef(null)
    const videoRef = useRef()

    const [start, setStart] = useState()
    const [isDoubleClick, setIsDoubleClick] = useState(false)
    //wait for user hover 1000ms then play video

    const handleMounseEnter = function () {
        if (clientWidth < 900) return //mobile version no need  to check hover
        hoverRef.current = setTimeout(() => {
            onMovieActive(post.id)
            setStart(true)
        }, 300)
    }
    const handleMouseLeave = () => {
        clearTimeout(hoverRef.current)
        setStart(false)
    }
    const handleOnPCClick = () => {
        updatePost(post.id, { shares: increment(1), played: increment(1) })
        navigate(useVideoPageRoute({ ...post }))
    }
    const handleMobileOnClick = function () {
        //handle show notification for user
        if (toastTimeoutId) clearTimeout(toastTimeoutId)
        if (!isDoubleClick && !start) {
            toastTimeoutId = setTimeout(() => {
                dispath(toastActions.addToast({ message: 'Double click to view full screen', mode: 'success' }))
            }, 300)
        }

        //handle click type (double/click)
        if (!isDoubleClick) {
            //click only
            onMovieActive(post.id)
            if (start) {
            }
            setStart((prev) => !prev)

            setIsDoubleClick(true)
            setTimeout(() => {
                setIsDoubleClick(false)
            }, 300)
        } else {
            //double click
            updatePost(post.id, { shares: increment(1), played: increment(1) })
            navigate(useVideoPageRoute({ ...post }))
        }
    }
    return (
        <div
            onClick={clientWidth > 900 ? handleOnPCClick : handleMobileOnClick}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMounseEnter}
            className={clsx('wrapper')}>
            <div className={clsx('top-movie')}>
                {isPlaying && start && (
                    <video
                        ref={videoRef}
                        loop={true}
                        autoPlay={true}
                        className={clsx('video')}
                        src={post?.video}></video>
                )}
                <Image className={clsx('poster')} src={post?.poster} />

                <div className={clsx('count-play', 'd-flex')}>
                    {!start ? <PlayIcon className={clsx('start-icon')} /> : <StartIcon className={clsx('stop-icon')} />}
                    <span>{formatCountNumber(post?.played) || 0}</span>
                </div>
            </div>
            <p className={clsx('title', 'ellipsis')}>{post?.title}</p>
        </div>
    )
}

export default memo(MovieCard)
