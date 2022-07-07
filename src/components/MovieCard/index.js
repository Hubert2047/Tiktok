/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { increment } from 'firebase/firestore'
import { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { updatePost } from '~/firebase'
import { formatCountNumber } from '~/helper'
import { useVideoPageRoute } from '~/hooks'
import styles from './MovieCard.module.scss'
const clsx = classNames.bind(styles)
function MovieCard({ post, isPlaying, onHover }) {
    const navigate = useNavigate()
    const hoverRef = useRef(null)
    //wait for user hover 1000ms then play video
    const handleMounseEnter = function () {
        hoverRef.current = setTimeout(() => {
            onHover(post.id)
        }, 300)
    }
    const handleMouseLeave = () => {
        clearTimeout(hoverRef.current)
    }
    const handleOnClick = function () {
        updatePost(post.id, { shares: increment(1), played: increment(1) })
        navigate(useVideoPageRoute({ ...post }))
    }
    return (
        <div
            onClick={handleOnClick}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMounseEnter}
            className={clsx('wrapper')}>
            <div className={clsx('top-movie')}>
                {isPlaying && <video loop={true} autoPlay={true} className={clsx('video')} src={post.video}></video>}
                <Image className={clsx('poster')} src={post?.poster} />

                <div className={clsx('count-play', 'd-flex')}>
                    <PlayIcon />
                    <span>{formatCountNumber(post?.played) || 0}</span>
                </div>
            </div>
            <p className={clsx('title', 'ellipsis')}>{post?.title}</p>
        </div>
    )
}

export default memo(MovieCard)
