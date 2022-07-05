/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import classNames from 'classnames/bind'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetApp from '~/components/GetApp'
import Loading from '~/components/Loading'
import PostContainer from '~/components/PostContainter'
import { getPosts } from '~/firebase'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { homeActions } from '~/redux/homeSlice'
import styles from './Home.module.scss'
const clsx = classNames.bind(styles)

function Home() {
    console.log('re-render home')
    const dispath = useDispatch()
    const posts = useSelector((state) => state.home.posts)
    const [lastPost, setLastPost] = useState()
    const [hasMorePost, setHasMorePost] = useState(true)
    const currentPostPlayingId = useSelector((state) => state.home.currentPostPlayingId)
    const observer = useRef()
    const getPostsJSON = function () {
        if (posts?.length > 0) return
        dispath(containerPortalActions.setComponent(<Loading />))
        getPosts((data) => {
            dispath(homeActions.setPost(data.posts))
            setLastPost(data.lastDoc)
            setTimeout(() => {
                dispath(containerPortalActions.setComponent(null))
                console.log('time out')
            }, 0) //wait video render
        })
    }
    useEffect(() => {
        getPostsJSON()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        //check if page not active/change tab then stop play video
        const handleOnChangePageTab = function () {
            if (document.visibilityState === 'visible') {
                dispath(homeActions.setIsPageActive(true))
            } else {
                dispath(homeActions.setIsPageActive(false))
            }
        }
        document.addEventListener('visibilitychange', handleOnChangePageTab)

        return () => {
            document.removeEventListener('visibilitychange', handleOnChangePageTab)
        }
    }, [])
    console.log('hasmore', hasMorePost)
    const getMorePostsJSON = function (lastPost) {
        if (!hasMorePost) return
        getPosts((data) => {
            if (!data?.posts?.length) {
                console.log('nothing')
                setHasMorePost(false)
                return
            }
            dispath(homeActions.setPost([...posts, ...data.posts]))
            setLastPost(data.lastDoc)
        }, lastPost)
    }

    // useEffect(() => {
    //     // return () => {
    //     //     dispath(homeActions.setCurrentPostPlayingId(null))
    //     //     dispath(homeActions.setPost([]))
    //     // }
    //     //reset post when component unmouse
    // }, [])

    //lazy loaded
    const lastPostCallBack = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        if (posts?.length < 5 && !hasMorePost) return
                        getMorePostsJSON(lastPost)
                    }
                },
                { threshold: 0.5 }
            )
            if (node) {
                observer.current.observe(node)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lastPost]
    )
    return (
        <div className={clsx('wrapper')}>
            {/* <SnapScrollContainer> */}
            {posts?.map((post, index) => {
                //check the last post to know when have to get new post
                if (posts.length - 2 === index) {
                    return (
                        <PostContainer
                            className={clsx('post')}
                            ref={lastPostCallBack}
                            key={index}
                            post={post}
                            isCurrentPlaying={currentPostPlayingId === post.id}
                        />
                    )
                } else {
                    return (
                        <PostContainer
                            className={clsx('post')}
                            key={index}
                            post={post}
                            isCurrentPlaying={currentPostPlayingId === post.id}
                        />
                    )
                }
            })}
            {/* </SnapScrollContainer> */}
            <GetApp />
        </div>
    )
}

export default Home
