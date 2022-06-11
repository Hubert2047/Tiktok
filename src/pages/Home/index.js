import classNames from 'classnames/bind'
import { useCallback, useState } from 'react'
import PostContainer from '~/components/PostContainter'
import SnapScrollContainer from '~/components/SnapCrollContainer'
import { floowingUsers } from '~/staticData'
import styles from './Home.module.scss'

const clsx = classNames.bind(styles)
const posts = [
    {
        id: 1,
        user: floowingUsers[0],
        video: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2F1e8b36e4-27cf-4490-97b5-38abe98a6a7e.mp4?alt=media&token=1afb66f6-8311-42c4-b9fc-3ff6c83a5936',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2Fimage-1.jpg?alt=media&token=d87a70c5-a9a6-4c02-9fa7-1486bd23b7c3',
    },
    {
        id: 2,
        user: floowingUsers[1],
        video: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2F0c0341dd-56dc-4fbe-8356-d99ced8278a6.mp4?alt=media&token=eae63f31-20b2-48b2-80d6-61a5f983cca4',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2FmessageImage_1654974852832.jpg?alt=media&token=d3196da6-b6ab-447b-a24f-0e44f67bbc3a',
    },
    {
        id: 3,
        user: floowingUsers[3],
        video: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2Fc9ef3e0d-fb8f-40aa-8605-8c231f0143cc.mp4?alt=media&token=e3206451-71ea-4cd8-a8c3-7e53ed1b7733',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2FmessageImage_1654975013244.jpg?alt=media&token=aebf7320-0999-4f82-a195-d0e5f23bbc0a',
    },
    {
        id: 4,
        user: floowingUsers[4],
        video: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2F41aeab1f-7db5-4f81-95ac-010fbf88fa0a.mp4?alt=media&token=001f6df3-b243-43a4-b36a-311938d8f024',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2FmessageImage_1654975078549.jpg?alt=media&token=a8e11ceb-7272-40bd-b2a6-c3222395e6ce',
    },
]
function Home() {
    const [playingId, setPlayingId] = useState(null)
    const handleOnPlay = useCallback((id) => {
        setPlayingId(id)
    }, [])
    return (
        <div className={clsx('wrapper')}>
            <SnapScrollContainer>
                {posts?.map((post) => (
                    <PostContainer onPlay={handleOnPlay} key={post.id} post={post} isPlaying={playingId === post.id} />
                ))}
            </SnapScrollContainer>
        </div>
    )
}

export default Home
