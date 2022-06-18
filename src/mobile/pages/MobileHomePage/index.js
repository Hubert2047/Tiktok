import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Loading from '~/components/Loading'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import { getPosts } from '~/firebase'
import MobileFooter from '~/mobile/components/MobileFooter'
import MobileVideo from '~/mobile/components/MobileVideo'
import styles from './MobileHomePage.module.scss'

const clsx = classNames.bind(styles)
function MobileHomePage() {
    const [posts, setPosts] = useState([])
    const [lastPost, setLastPost] = useState()
    const [playingId, setPlayingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasMorePost, setHasMorePost] = useState(true)
    const observer = useRef()
    const getPostsJSON = async function () {
        setLoading(true)
        await getPosts((data) => {
            setPosts(data.posts)
            setLastPost(data.lastDoc)
            setLoading(false)
        })
    }
    const getMorePostsJSON = function (lastPost) {
        getPosts((data) => {
            if (!data?.posts?.length) {
                setHasMorePost(false)
                return
            }
            setPosts([...posts, ...data.posts])
            setLastPost(data.lastDoc)
        }, lastPost)
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
                        if (posts?.length < 5 && !hasMorePost) return
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
            <div className={clsx('video-container')}>
                {posts?.map((post, index) => {
                    //check the last post
                    if (posts.length - 1 === index) {
                        return (
                            <MobileVideo
                                className={clsx('video')}
                                ref={lastPostCallBack}
                                onPlay={handleOnPlay}
                                key={index}
                                post={post}
                                isPlaying={playingId === post.id}
                            />
                        )
                    } else {
                        return (
                            <MobileVideo
                                className={clsx('video')}
                                onPlay={handleOnPlay}
                                key={index}
                                post={post}
                                isPlaying={playingId === post.id}
                            />
                        )
                    }
                })}
            </div>
            <MobileFooter className={clsx('footer')} />
        </div>
    )
}

export default MobileHomePage
