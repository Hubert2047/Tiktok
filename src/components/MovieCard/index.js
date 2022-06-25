import classNames from 'classnames/bind'
import { memo, React, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PlayIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { formatCountNumber } from '~/helper'
import styles from './MovieCard.module.scss'
const clsx = classNames.bind(styles)
function MovieCard({ post, isPlaying, onHover }) {
    const navigate = useNavigate()
    const hoverRef = useRef(null)
    const profileUser = useSelector((state) => state.profile.profileUser)
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
        navigate(`/${profileUser.full_name}/video/${post.id}`)
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
