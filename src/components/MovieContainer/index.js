import classNames from 'classnames/bind'
import { useCallback, useState, memo } from 'react'
import MovieCard from '~/components/MovieCard'
import styles from './MovieContainer.module.scss'
const clsx = classNames.bind(styles)
function MovieContainer({ movies, children }) {
    const [moviePlayingId, setMoviePlaying] = useState(null)
    console.log('re-render')
    const handleHover = useCallback((id) => {
        setMoviePlaying(id)
    }, [])
    return (
        <div className={clsx('wrapper')}>
            {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onHover={handleHover} isPlaying={moviePlayingId === movie.id} />
            ))}
            {children}
        </div>
    )
}

export default memo(MovieContainer)
