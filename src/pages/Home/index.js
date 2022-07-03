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
    // console.log('re-render home')
    const dispath = useDispatch()
    const posts = useSelector((state) => state.home.posts)
    const [lastPost, setLastPost] = useState()
    const [loading, setLoading] = useState(false)
    const [hasMorePost, setHasMorePost] = useState(true)
    const observer = useRef()
    const getPostsJSON = async function () {
        setLoading(true)
        getPosts((data) => {
            dispath(homeActions.setPost(data.posts))
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
            dispath(homeActions.setPost([...posts, ...data.posts]))
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
            {loading && (
                <FullScreenModal>
                    <Loading />
                </FullScreenModal>
            )}
            <SnapScrollContainer>
                {posts?.map((post, index) => {
                    //check the last post
                    if (posts.length - 2 === index) {
                        return <PostContainer className={clsx('post')} ref={lastPostCallBack} key={index} post={post} />
                    } else {
                        return <PostContainer className={clsx('post')} key={index} post={post} />
                    }
                })}
            </SnapScrollContainer>
        </div>
    )
}

export default Home
