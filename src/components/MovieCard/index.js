import classNames from 'classnames/bind'
import { memo, React, useRef } from 'react'
import { PlayIcon } from '~/components/Icons'
import Image from '~/components/Image'
import styles from './MovieCard.module.scss'
const clsx = classNames.bind(styles)
function MovieCard({ movie, isPlaying, onHover }) {
    const hoverRef = useRef(null)
    //wait for user hover 1000ms then play video
    const handleMounseEnter = function () {
        hoverRef.current = setTimeout(() => {
            onHover(movie.id)
        }, 1000)
    }
    const handleMouseLeave = () => {
        clearTimeout(hoverRef.current)
    }
    return (
        <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMounseEnter} className={clsx('wrapper')}>
            <div className={clsx('top-movie')}>
                {isPlaying && <video loop={true} autoPlay={true} className={clsx('video')} src={movie.src}></video>}
                <Image className={clsx('poster')} src={movie.poster} />

                <div className={clsx('count-play', 'd-flex')}>
                    <PlayIcon />
                    <span>{movie.playCount}</span>
                </div>
            </div>
            <p className={clsx('title', 'ellipsis')}>{movie.title}</p>
        </div>
    )
}

export default memo(MovieCard)
