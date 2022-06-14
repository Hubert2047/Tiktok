import classNames from 'classnames/bind'
import { useCallback, useState, memo } from 'react'
import MovieCard from '~/components/MovieCard'
import styles from './MovieContainer.module.scss'
const clsx = classNames.bind(styles)
function MovieContainer({ posts, children }) {
    const [moviePlayingId, setMoviePlaying] = useState(null)
    // console.log('re-render')
    // console.log('posts', posts)
    const handleHover = useCallback((id) => {
        setMoviePlaying(id)
    }, [])
    return (
        <div className={clsx('wrapper')}>
            {posts?.map((post) => (
                <MovieCard key={post.id} post={post} onHover={handleHover} isPlaying={moviePlayingId === post.id} />
            ))}
            {children}
        </div>
    )
}

export default memo(MovieContainer)
