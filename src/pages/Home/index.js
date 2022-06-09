import PostContainer from '~/components/PostContainter'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const clsx = classNames.bind(styles)
function Home() {
    return (
        <div style={{ height: '2000px' }} className={clsx('wrapper')}>
            <PostContainer />
        </div>
    )
}

export default Home
