/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CommentContainer } from '~/components/Comment'
import { XIcon } from '~/components/Icons'
import Loading from '~/components/Loading'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import { getCommentCount, getPosts } from '~/firebase'
import MobileCommentInput from '~/mobile/components/mobileCommentInput'
import MobileFooter from '~/mobile/components/MobileFooter'
import MobileHeader from '~/mobile/components/MobileHeader'
import MobileVideo from '~/mobile/components/MobileVideo'
import { mobileHomeActions } from '~/redux/mobile/mobileHomeSlice'
import styles from './MobileHomePage.module.scss'

const clsx = classNames.bind(styles)
function MobileHomePage() {
    console.log('re-render mobile homepage')
    const currentPost = useSelector((state) => state.mobileHome.currentPost)
    const [commentCount, setCommentCount] = useState()
    const dispath = useDispatch()
    const [posts, setPosts] = useState([])
    const [lastPost, setLastPost] = useState()
    const [currentPostPlayingId, setCurrentPostPlayingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasMorePost, setHasMorePost] = useState(true)
    const observer = useRef()
    useEffect(() => {
        if (!commentCount?.post) return
        getCommentCount(currentPost.post.id, (result) => {
            console.log(result)
            setCommentCount(result)
        })
    }, [commentCount])
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
            console.log('run call back')
            setCurrentPostPlayingId(id)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
    const handleCloseCommentBtn = function () {
        dispath(
            mobileHomeActions.setPost({
                ...currentPost,
                showCommentBox: false,
            })
        )
    }
    return (
        <div className={clsx('wrapper')}>
            {loading && (
                <FullScreenModal>
                    <Loading />
                </FullScreenModal>
            )}
            <MobileHeader className={clsx('header')} />
            <div className={clsx('video-container')}>
                {posts?.map((post, index) => {
                    //check the last post
                    if (posts.length - 3 === index) {
                        return (
                            <MobileVideo
                                className={clsx('video')}
                                ref={lastPostCallBack}
                                onPlay={handleOnPlay}
                                key={index}
                                post={post}
                                isCurrentPostPlaying={currentPostPlayingId === post.id}
                            />
                        )
                    } else {
                        return (
                            <MobileVideo
                                className={clsx('video')}
                                onPlay={handleOnPlay}
                                key={index}
                                post={post}
                                isCurrentPostPlaying={currentPostPlayingId === post.id}
                            />
                        )
                    }
                })}
            </div>
            <MobileFooter className={clsx('footer')} />
            {currentPost?.showCommentBox && (
                <div className={clsx('comment', 'd-flex')}>
                    <div className={clsx('comment-header')}>
                        <span className={clsx('comment-count')}>
                            {commentCount > 1 ? `${commentCount} comments` : `${commentCount} comment`}
                        </span>
                        <XIcon
                            onClick={handleCloseCommentBtn}
                            height='2.5rem'
                            width='2.5rem'
                            className={clsx('comment-close-btn')}
                        />
                    </div>
                    <CommentContainer post={currentPost?.post} className={clsx('comment-container')} />
                    <MobileCommentInput className={clsx('comment-input')} post={currentPost?.post} />
                </div>
            )}
        </div>
    )
}

export default MobileHomePage
