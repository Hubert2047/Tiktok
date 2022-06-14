/* eslint-disable no-undef */
import classNames from 'classnames/bind'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '~/components/Loading'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import PostContainer from '~/components/PostContainter'
import SnapScrollContainer from '~/components/SnapCrollContainer'
import { getPosts } from '~/firebase'
import { homeActions } from '~/redux/homeSlice'
import styles from './Home.module.scss'
const clsx = classNames.bind(styles)

function Home() {
    const dispath = useDispatch()
    const posts = useSelector((state) => state.home.posts)
    const [playingId, setPlayingId] = useState(null)
    const [lastPost, setLastPost] = useState()
    const [loading, setLoading] = useState(false)
    const observer = useRef()
    const getPostsJSON = async function () {
        setLoading(true)
        const data = await getPosts()
        dispath(homeActions.setPost(data.posts))
        setLastPost(data.lastDoc)
        setLoading(false)
    }
    const getMorePostsJSON = async function (lastPost) {
        const data = await getPosts(lastPost)
        if (!data?.posts?.length) return
        dispath(homeActions.setPost([...posts, ...data.posts]))
        setLastPost(data.lastDoc)
    }
    useEffect(() => {
        getPostsJSON()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const lastPostCallBack = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        getMorePostsJSON(lastPost)
                    }
                }
                // ,{ threshold: 1.0 }
            )
            if (node) {
                observer.current.observe(node)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lastPost]
    )

    const handleOnPlay = useCallback(
        (id) => {
            setPlayingId(id)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <div className={clsx('wrapper')}>
            {loading && (
                <FullScreenModal>
                    <Loading />
                </FullScreenModal>
            )}
            <SnapScrollContainer>
                {posts?.map((post, index) => {
                    //check the last post
                    if (posts.length - 1 === index) {
                        return (
                            <PostContainer
                                className={clsx('post')}
                                ref={lastPostCallBack}
                                onPlay={handleOnPlay}
                                key={index}
                                post={post}
                                isPlaying={playingId === post.id}
                            />
                        )
                    } else {
                        return (
                            <PostContainer
                                className={clsx('post')}
                                onPlay={handleOnPlay}
                                key={index}
                                post={post}
                                isPlaying={playingId === post.id}
                            />
                        )
                    }
                })}
            </SnapScrollContainer>
        </div>
    )
}

export default Home
