import classNames from 'classnames/bind'
import { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '~/components/MovieCard'
import styles from './MovieContainer.module.scss'
const clsx = classNames.bind(styles)
function MovieContainer({ posts, children }) {
    const [moviePlayingId, setMoviePlaying] = useState(null)
    const isPageActive = useSelector((state) => state.home.isPageActive)
    const [clientWidth] = useState(() => {
        return document.documentElement.clientWidth
    })
    const handleOnMovieActive = useCallback((id) => {
        setMoviePlaying(id)
    }, [])
    return (
        <div className={clsx('wrapper')}>
            {posts?.map((post) => {
                return (
                    <MovieCard
                        key={post.id}
                        clientWidth={clientWidth}
                        post={post}
                        onMovieActive={handleOnMovieActive}
                        isPlaying={moviePlayingId === post.id && isPageActive}
                    />
                )
            })}
            {children}
        </div>
    )
}

export default memo(MovieContainer)
