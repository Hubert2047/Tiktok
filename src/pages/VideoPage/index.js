/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import LinesEllipsis from 'react-lines-ellipsis'
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
    PlayIcon,
    ReportIcon,
    SendToIcon,
    ShareIcon,
    TwitterIcon,
    WhatsAppIcon,
    XIcon,
} from '~/components/Icons'
import Loading from '~/components/Loading'
import { LoginPopup } from '~/components/Popper'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import { deletePost, getCommentCount, getPost } from '~/firebase'
import { convertTimeStampToDate, formatCountNumber, handleFollowingUser, handleLikePost } from '~/helper'
import { useProfileRoute } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { toastActions } from '~/redux/toastSlice'
import styles from './VideoPage.module.scss'
const clsx = classNames.bind(styles)
function VideoPage() {
    // console.log('re-render video page')
    const params = useParams()
    const dispath = useDispatch()
    // console.log(params)
    // const dispath = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const [post, setPost] = useState({})
    const [commentCount, setCommentCount] = useState(0)
    const [showallContent, setShowAllContent] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const [isFollowing, setIsFollowing] = useState()
    const [isLikedPost, setIsLikedPost] = useState()
    const postId = params.id
    // console.log(postId)
    const handleNavigate = function () {
        navigate(useProfileRoute(post.user))
    }

    useEffect(() => {
        if (post.id)
            getCommentCount(post.id, (commentCount) => {
                setCommentCount(commentCount)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])
    const handleGoBackHome = function () {
        navigate('/')
    }
    const NotFoundPost = function () {
        return (
            <div className={clsx('not-found-post', 'd-flex')}>
                {/* <Image
                    src={
                        'https://firebasestorage.googleapis.com/v0/b/tiktok-2da3a.appspot.com/o/images%2F404-not-found.jpeg?alt=media&token=057e62d5-79f0-4d41-b3e3-299f0ee10cf5'
                    }
                    className={clsx('not-found-img')}
                /> */}
                <p className={clsx('not-found-title')}>This post may have been deleted by the author</p>
                <p className={clsx('not-found-desc')}>Check out more trending videos on TikTok</p>
                <Button
                    icon={<PlayIcon />}
                    onClick={handleGoBackHome}
                    title='Watch Now'
                    size='size-big'
                    bg='bg-primary'
                    color='color-white'
                    className={clsx('back-home-btn')}
                />
            </div>
        )
    }
    useEffect(() => {
        const getPostJSON = async function () {
            // setLoading(true)
            dispath(containerPortalActions.setComponent(<Loading />))
            try {
                const data = await getPost(postId)
                if (!data) {
                    dispath(containerPortalActions.setComponent(<NotFoundPost />))
                    return
                }
                setPost(data)
                setIsLikedPost(currentUser?.likes?.includes(data?.id) || false)
                setIsFollowing(currentUser?.following?.includes(data?.user?.uid) || false)
                dispath(containerPortalActions.setComponent(null)) //close loading
            } catch (e) {
                dispath(containerPortalActions.setComponent(null)) //close loading
                console.log(e)
            }
        }
        getPostJSON()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleReflow = function (rleState) {
        setIsClamped(rleState.clamped)
    }

    const handleFollowing = async function () {
        try {
            const result = await handleFollowingUser(currentUser, post.user, isFollowing)
            if (result?.showLogin) dispath(containerPortalActions.setComponent(<LoginPopup />))
            //data is not realtime so we have to manually state
            if (result?.isFollowing) {
                setIsFollowing(true)
            } else {
                setIsFollowing(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleLikePostAction = async function () {
        const result = await handleLikePost(currentUser, post, isLikedPost)
        if (result?.showLogin) dispath(containerPortalActions.setComponent(<LoginPopup />))
        //data is not realtime so we have to manually state
        setIsLikedPost(result?.isLikedPost)
        setPost((prev) => {
            if (result.isLikedPost) return { ...prev, likes: prev.likes + 1 }
            return { ...prev, likes: prev.likes - 1 }
        })
    }
    const handleDeletePostOnSubmit = async function () {
        try {
            dispath(containerPortalActions.setComponent(<Loading />))
            await deletePost(postId)
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
            containerPortalActions.setComponent(
                <Comfirm
                    question='Are you sure you want to delete this video?'
                    subMitTitle='Delete'
                    onSubmit={handleDeletePostOnSubmit}
                />
            )
        )
    }
    const handleOnReport = function () {
        dispath(toastActions.addToast({ message: 'Reported!', mode: 'success' }))
    }
    const Actions = function ({ placement }) {
        return (
            <Tippy
                // trigger='click'
                // hideOnClick={true}
                // disabled={true}
                offset={[-10, 0]}
                placement={placement}
                interactive={true}
                render={(attrs) => (
                    <div className={clsx('action-options', 'd-flex')} tabIndex='-1' {...attrs}>
                        <Button title='Private Setting' color='color-white' className={clsx('option-btn')} />
                        <Button
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
    return (
        <div>
            {post.id && (
                <div className={clsx('wrapper')}>
                    <div className={clsx('video-container', 'flex-center')}>
                        <video
                            loop={true}
                            controls={true}
                            autoPlay={true}
                            className={clsx('video')}
                            src={post?.video}></video>
                        <Button to={'/'} icon={<XIcon />} type='btn-all-rounded' className={clsx('close-btn')} />
                        <Button
                            title='Report'
                            color={'color-white'}
                            icon={<ReportIcon />}
                            onClick={handleOnReport}
                            className={clsx('report-btn')}
                        />
                    </div>
                    <div className={clsx('right-container', 'd-flex')}>
                        <div className={clsx('top', 'd-flex')}>
                            <div className={clsx('header', 'd-flex')}>
                                <ProfileContainer user={post?.user}>
                                    <UserAvatar onClick={handleNavigate} height={'4rem'} user={post?.user} />
                                </ProfileContainer>
                                <div className={clsx('name-box', 'd-flex')}>
                                    <p className={clsx('full-name')}>{post?.user?.full_name}</p>
                                    <div className={clsx('d-flex', 'other-infor')}>
                                        <p className={clsx('nickname')}>{post?.user?.nickname}</p>
                                        <p className={clsx('time')}>{convertTimeStampToDate(post?.createdAt)}</p>
                                    </div>
                                </div>

                                {currentUser?.uid === post?.user.uid ? (
                                    <Actions placement={'left-start'} />
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
                            <div className={clsx('content')}>
                                {!showallContent ? (
                                    <LinesEllipsis
                                        text={post.content}
                                        maxLine={2}
                                        ellipsis={' ...'}
                                        basedOn='words'
                                        onReflow={handleReflow}
                                    />
                                ) : (
                                    showallContent && (
                                        <div>
                                            <p>{post.content}</p>
                                        </div>
                                    )
                                )}
                                {isClamped && (
                                    <button
                                        onClick={() => {
                                            setShowAllContent((prev) => !prev)
                                        }}
                                        className={clsx('btn-see-more')}>
                                        {!showallContent ? ' See more ...' : 'See less ...'}
                                    </button>
                                )}
                            </div>
                            <div className={clsx('actions', 'd-flex')}>
                                <div className={clsx('action-left', 'd-flex')}>
                                    <div className={clsx('action-box', 'd-flex')}>
                                        <div onClick={handleLikePostAction} className={clsx('icon-box', 'flex-center')}>
                                            <Fragment>{!isLikedPost ? <HeartIcon /> : <HeartPrimary />}</Fragment>
                                        </div>
                                        <span>{formatCountNumber(post?.likes)}</span>
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
                                <input readOnly='readonly' value={post?.video} className={clsx('input-link')} />
                                <CopyToClipboard text={post?.video}>
                                    <Button title='Copy link' size='size-sm' className={clsx('link-btn')} />
                                </CopyToClipboard>
                            </div>
                        </div>
                        <CommentContainer post={post} className={clsx('comment-container')} />
                        <CommentInput className={clsx('cu-input')} post={post} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(VideoPage)
