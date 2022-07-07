/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment, memo, useEffect, useMemo, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '~/components/Button'
import Comfirm from '~/components/Comfirm'
import { CommentContainer, CommentInput } from '~/components/Comment'
import {
    CommentIcon,
    EmbedIcon,
    FaceBookIcon,
    HeartIcon,
    HeartPrimary,
    HorizontalThreeDot,
    SendToIcon,
    ShareIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '~/components/Icons'
import Loading from '~/components/Loading'
import { LoginPopup } from '~/components/Popper'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import { deletePost, getCommentCount, getUserPosts } from '~/firebase'
import { convertTimeStampToDate, formatCountNumber, handleFollowingUser, handleLikePost } from '~/helper'
import { useProfileRoute } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { homeActions } from '~/redux/homeSlice'
import { toastActions } from '~/redux/toastSlice'
import VideoContainer from './VideoContainer'
import VideoNotFound from './VideoNotFound'
import styles from './VideoPage.module.scss'
const clsx = classNames.bind(styles)
function VideoPage() {
    // console.log('re-render video page')
    const isPageActive = useSelector((state) => state.home.isPageActive)
    const params = useParams()
    const dispath = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const [posts, setPosts] = useState({})
    const [currentPlayVideoId, setcurrentPlayVideoId] = useState(params.id)
    const [commentCount, setCommentCount] = useState(0)
    const videoContainerRef = useRef()
    const scrollCommentRef = useRef()
    const handleNavigate = function () {
        navigate(useProfileRoute(currentPlayVideo.postUser))
    }

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
    const handleDeletePostOnSubmit = async function () {
        try {
            dispath(containerPortalActions.setComponent({ component: <Loading />, onClickOutside: true }))
            await deletePost(currentPlayVideo.id)
            dispath(containerPortalActions.setComponent(null)) //close loading
            dispath(toastActions.addToast({ message: 'Deleted', mode: 'success' }))
            navigate(useProfileRoute(currentUser))
        } catch (error) {
            dispath(containerPortalActions.setComponent(null))

            console.log(error)
        }
    }
    const handleDeletePost = async function (postId) {
        dispath(
            containerPortalActions.setComponent({
                component: (
                    <Comfirm
                        question='Are you sure you want to delete this video?'
                        subMitTitle='Delete'
                        onSubmit={handleDeletePostOnSubmit}
                    />
                ),
                onClickOutside: true,
            })
        )
    }

    const handleCopyLink = function () {
        dispath(toastActions.addToast({ message: 'Copied!', mode: 'success' }))
    }
    const handleOnObserver = function (videoId) {
        setcurrentPlayVideoId(videoId)
    }

    const Actions = function ({ placement }) {
        return (
            <Tippy
                // trigger='click'
                // hideOnClick={true}
                // visible={visible}
                // disabled={true}
                offset={[-10, 0]}
                placement={placement}
                interactive={true}
                render={(attrs) => (
                    <div className={clsx('action-options', 'd-flex')} tabIndex='-1' {...attrs}>
                        <Button to='.' title='Private Setting' color='color-white' className={clsx('option-btn')} />
                        <Button
                            to='.'
                            onClick={handleDeletePost}
                            title='Delete'
                            color='color-white'
                            className={clsx('option-btn')}
                        />
                    </div>
                )}>
                <div className={clsx('conversation-btn-box')}>
                    <HorizontalThreeDot className={clsx('conversation-btn')} />
                </div>
            </Tippy>
        )
    }
    const handleWatchVideo = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        videoContainerRef.current.handleStartVideo()
    }
    return (
        <div>
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
                                    className={clsx('video')}
                                />
                            )
                        })}
                    </div>
                    <div className={clsx('right-container', 'd-flex')}>
                        <div className={clsx('top', 'd-flex')}>
                            <div className={clsx('header', 'd-flex')}>
                                <ProfileContainer user={currentPlayVideo?.postUser}>
                                    <UserAvatar
                                        onClick={handleNavigate}
                                        height={'4rem'}
                                        user={currentPlayVideo?.postUser}
                                    />
                                </ProfileContainer>
                                <div className={clsx('name-box', 'd-flex')}>
                                    <p className={clsx('full-name')}>{currentPlayVideo?.postUser?.full_name}</p>
                                    <div className={clsx('d-flex', 'other-infor')}>
                                        {currentPlayVideo?.postUser?.nickname && (
                                            <p className={clsx('nickname')}>{currentPlayVideo?.postUser?.nickname}</p>
                                        )}
                                        <p className={clsx('time')}>
                                            {convertTimeStampToDate(currentPlayVideo?.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleWatchVideo}
                                    title='Watch video'
                                    bg='bg-primary'
                                    color='color-white'
                                    size='size-sm'
                                    className={clsx('watch-video')}
                                />

                                {currentUser?.uid === currentPlayVideo?.uid ? (
                                    <div className={clsx('action-box')}>
                                        <Actions placement={'left-start'} />
                                    </div>
                                ) : (
                                    <Button
                                        className={clsx('follow-btn')}
                                        title={isFollowing ? 'Following' : 'Follow'}
                                        onClick={handleFollowing}
                                        border={isFollowing ? 'border-grey' : 'border-primary'}
                                        color={isFollowing ? 'color-grey' : 'color-primary'}
                                        size={'size-md'}
                                    />
                                )}
                            </div>
                            <div className={clsx('content')}>{currentPlayVideo.content}</div>
                            <div className={clsx('actions', 'd-flex')}>
                                <div className={clsx('action-left', 'd-flex')}>
                                    <div className={clsx('action-box', 'd-flex')}>
                                        <div onClick={handleLikePostAction} className={clsx('icon-box', 'flex-center')}>
                                            <Fragment>{!isLikedPost ? <HeartIcon /> : <HeartPrimary />}</Fragment>
                                        </div>
                                        <span>{formatCountNumber(currentPlayVideo?.likes)}</span>
                                    </div>
                                    <div className={clsx('action-box', 'd-flex')}>
                                        <div className={clsx('icon-box', 'flex-center')}>
                                            <CommentIcon />
                                        </div>
                                        <span>{commentCount || 0}</span>
                                    </div>
                                </div>
                                <div className={clsx('action-right', 'd-flex')}>
                                    <EmbedIcon />
                                    <SendToIcon />
                                    <WhatsAppIcon />
                                    <FaceBookIcon className={clsx('fb-icon')} />
                                    <TwitterIcon />
                                    <ShareIcon width='24px' height='24px' />
                                </div>
                            </div>
                            <div className={clsx('copy-link', 'd-flex')}>
                                <input
                                    readOnly='readonly'
                                    value={currentPlayVideo?.video}
                                    className={clsx('input-link')}
                                />
                                <CopyToClipboard text={currentPlayVideo?.video}>
                                    <Button
                                        onClick={handleCopyLink}
                                        title='Copy link'
                                        size='size-sm'
                                        className={clsx('link-btn')}
                                    />
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div ref={scrollCommentRef}></div>
                        <CommentContainer post={currentPlayVideo} className={clsx('comment-container')} />
                        <CommentInput className={clsx('cu-input')} post={currentPlayVideo} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(VideoPage)
