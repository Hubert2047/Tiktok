/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'
import { LoginPopup } from '~/components/Popper'
import { getCommentCount, getUserPosts } from '~/firebase'
import { handleFollowingUser, handleLikePost, windowHeight } from '~/helper'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { homeActions } from '~/redux/homeSlice'
import VideoContainer from './VideoContainer'
import VideoNotFound from './VideoNotFound'
import styles from './VideoPage.module.scss'
import VideoPageRight from './VideoPageRight'
const clsx = classNames.bind(styles)
function VideoPage() {
    // console.log('re-render video page')
    const isPageActive = useSelector((state) => state.home.isPageActive)
    const params = useParams()
    const dispath = useDispatch()
    // const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const [posts, setPosts] = useState({})
    const [currentPlayVideoId, setcurrentPlayVideoId] = useState(params.id)
    const [commentCount, setCommentCount] = useState(0)
    const [showCommentBox, setShowCommentBox] = useState(false)
    const videoContainerRef = useRef()
    const scrollCommentRef = useRef()
    const videoPageRef = useRef()

    const currentPlayVideo = useMemo(() => {
        if (!posts?.length > 0) return
        return posts?.find((post) => post?.id === currentPlayVideoId)
    }, [currentPlayVideoId, posts])

    //if there are many users can use this way
    const isFollowing = useMemo(() => {
        return currentUser?.following?.includes(currentPlayVideo?.postUser?.uid)
    }, [currentUser])
    const isLikedPost = useMemo(() => currentUser?.likes?.includes(currentPlayVideo?.id), [currentUser])

    useEffect(() => {
        const getPosts = async function () {
            //open loading
            dispath(containerPortalActions.setComponent({ component: <Loading />, onClickOutside: true }))
            try {
                const data = await getUserPosts(params.uid)
                if (!data?.length > 0) {
                    dispath(
                        containerPortalActions.setComponent({ component: <VideoNotFound />, onClickOutside: false })
                    )
                    return
                }
                //try to put search post to the first of list

                const paramPost = data.find((item) => item.id === params.id)
                if (!paramPost) {
                    dispath(
                        containerPortalActions.setComponent({ component: <VideoNotFound />, onClickOutside: false })
                    )
                    return
                }

                const paramPostIndex = data.findIndex((item) => item === paramPost)
                data.splice(paramPostIndex, 1)
                setPosts([paramPost, ...data])

                //close loading , wait video loading 500ms
                setTimeout(() => {
                    dispath(containerPortalActions.setComponent(null))
                }, 500)
            } catch (error) {
                console.log(error)
                dispath(containerPortalActions.setComponent(null))
            }
        }
        getPosts()
    }, [])

    useEffect(() => {
        if (currentPlayVideo?.id)
            getCommentCount(currentPlayVideo.id, (commentCount) => {
                setCommentCount(commentCount)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayVideo])

    const handleFollowing = async function () {
        try {
            const result = await handleFollowingUser(currentUser, currentPlayVideo.postUser, isFollowing)
            if (result?.showLogin) {
                dispath(containerPortalActions.setComponent({ component: <LoginPopup />, onClickOutside: true }))
                return
            }
            // }
        } catch (error) {
            console.log(error)
        }
    }
    const handleLikePostAction = async function () {
        const result = await handleLikePost(currentUser, currentPlayVideo, isLikedPost)
        if (result?.showLogin) {
            dispath(containerPortalActions.setComponent({ component: <LoginPopup />, onClickOutside: true }))
            return
        }
        //data is not realtime so we have to manually state

        //update data because data is not realtime, it does not call back data again when go back home page
        dispath(homeActions.setUpdateLikes({ postId: currentPlayVideo.id, value: result.value }))
        //update current video post list
        setPosts((prev) => {
            return prev.map((post) => {
                if (post.id === currentPlayVideo.id) {
                    return { ...post, likes: post.likes + result.value }
                }
                return post
            })
        })
    }
    useEffect(() => {
        windowHeight()
        window.addEventListener('resize', windowHeight)
        return () => {
            window.removeEventListener('resize', windowHeight)
        }
    }, [])
    const handleWatchComment = function (e) {
        e.stopPropagation()
        videoContainerRef?.current?.handleStartVideo(false)
        setShowCommentBox(true)
    }
    const handleOnObserver = function (videoId) {
        setcurrentPlayVideoId(videoId)
    }

    return (
        <div ref={videoPageRef}>
            {posts?.length > 0 && (
                <div className={clsx('wrapper')}>
                    <div className={clsx('list-video', 'd-flex')}>
                        {posts?.map((post) => {
                            return (
                                <VideoContainer
                                    key={post.id}
                                    scrollCommentRef={scrollCommentRef}
                                    post={post}
                                    ref={videoContainerRef}
                                    isPlaying={post?.id === currentPlayVideo?.id && isPageActive}
                                    onObserver={handleOnObserver}
                                    handleWatchComment={handleWatchComment}
                                    currentPlayVideo={currentPlayVideo}
                                    commentCount={commentCount}
                                    className={clsx('video')}
                                />
                            )
                        })}
                    </div>
                    <VideoPageRight
                        currentUser={currentUser}
                        currentPlayVideo={currentPlayVideo}
                        commentCount={commentCount}
                        isFollowing={isFollowing}
                        isLikedPost={isLikedPost}
                        handleStartVideo={videoContainerRef?.current?.handleStartVideo}
                        handleLikePostAction={handleLikePostAction}
                        handleFollowing={handleFollowing}
                        setShowCommentBox={setShowCommentBox}
                        className={clsx({ 'show-comment': showCommentBox })}
                    />
                </div>
            )}
        </div>
    )
}

export default memo(VideoPage)
