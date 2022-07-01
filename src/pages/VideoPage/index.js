/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import LinesEllipsis from 'react-lines-ellipsis'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '~/components/Button'
import { CommentContainer, CommentInput } from '~/components/Comment'
import {
    CommentIcon,
    EmbedIcon,
    FaceBookIcon,
    HeartIcon,
    HeartPrimary,
    ReportIcon,
    SendToIcon,
    ShareIcon,
    TwitterIcon,
    WhatsAppIcon,
    XIcon,
} from '~/components/Icons'
import Loading from '~/components/Loading'
import { LoginPopup } from '~/components/Popper'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import { getCommentCount, getPost } from '~/firebase'
import { convertTimeStampToDate, formatCountNumber, handleFollowingUser, handleLikePost } from '~/helper'
import { useProfileRoute } from '~/hooks'
import styles from './VideoPage.module.scss'
const clsx = classNames.bind(styles)
function VideoPage() {
    console.log('re-render video page')
    const params = useParams()
    // console.log(params)
    // const dispath = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const [post, setPost] = useState({})
    const [commentCount, setCommentCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [showallContent, setShowAllContent] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
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
    useEffect(() => {
        const getPostJSON = async function () {
            setLoading(true)
            try {
                const data = await getPost(postId)
                setPost(data)
                setIsLikedPost(currentUser?.likes?.includes(data?.id) || false)
                setIsFollowing(currentUser?.following?.includes(post?.user?.uid) || false)
                setLoading(false)
            } catch (e) {
                setLoading(false)
                console.log(e)
            }
        }
        getPostJSON()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleReflow = function (rleState) {
        setIsClamped(rleState.clamped)
    }
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    const handleFollowing = async function () {
        try {
            const result = await handleFollowingUser(currentUser, post.user, isFollowing)
            if (result?.showLogin) handleShowLogin(true)
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
        if (result?.showLogin) handleShowLogin(true)
        //data is not realtime so we have to manually state
        setIsLikedPost(result?.isLikedPost)
    }
    return (
        <div>
            {loading && (
                <FullScreenModal className={clsx('loading')}>
                    <Loading />
                </FullScreenModal>
            )}
            {showLogin && (
                <FullScreenModal handleShowPopup={handleShowLogin}>
                    <LoginPopup handleShowPopup={handleShowLogin} />
                </FullScreenModal>
            )}
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
                                {currentUser?.uid !== post.uid && (
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
                                    <ShareIcon width='2.4rem' height='2.4rem' />
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
