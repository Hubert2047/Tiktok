/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { forwardRef, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import { v4 as uuidv4 } from 'uuid'
import Button from '~/components/Button'
import { DeleteIcon, HeartAnimated, HeartPrimary, HorizontalThreeDot, ReportIcon } from '~/components/Icons'
import ProfileContainer from '~/components/ProfileContainer'
import { deleteComment, getComments, updateCommentLikes } from '~/firebase'
import { convertTimeStampToDate } from '~/helper'
import { useProfileRoute } from '~/hooks'
import { commentActions } from '~/redux/commentSlice'
import { toastActions } from '~/redux/toastSlice'
import { notification } from '~/staticData'
import Comfirm from '../Comfirm'
import { LoginPopup } from '../Popper'
import FullScreenModal from '../Popper/FullScreenModal'
import UserAvatar from '../UserAvatar'
import styles from './Comment.module.scss'

const clsx = classNames.bind(styles)

const Comment = forwardRef(({ comment, post, rootCommentId }, ref) => {
    const isRootCommnet = comment.parentId === 'null' || false
    const avatarHeight = isRootCommnet ? '4rem' : '2.75rem'
    const dispath = useDispatch()
    const inputRef = useSelector((state) => state.comment.inputRef)
    const currentUser = useSelector((state) => state.user.user)
    const [childrenComments, setChildrenComments] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const childrenCommentCount = childrenComments?.length || 0
    const [viewReplies, setViewReplies] = useState(false)
    const [showComfirm, setShowComfirm] = useState(false)
    const isLiked = comment.likes.includes(currentUser.uid)
    const navigate = useNavigate()
    // console.log('re-render comment', comment.id)
    const updateChildrenComments = function (data) {
        setChildrenComments(data.comments)
    }
    useEffect(() => {
        try {
            getComments({
                postId: post.id,
                callback: updateChildrenComments,
                parentId: comment.id,
                lastDocComment: 0,
                commentLimit: 'all',
            })
        } catch (e) {
            console.log(e)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleRenderChildrenComments = function () {
        setViewReplies((prev) => !prev)
    }
    const handleNavigate = function () {
        navigate(useProfileRoute(comment.user))
    }

    const handleReportOnClick = function () {
        dispath(
            toastActions.addToast({ title: 'Reported!', message: 'thank you  for your reporting', mode: 'success' })
        )
    }
    const handleReplyOnClick = function () {
        inputRef?.focus()
        dispath(
            commentActions.setLastUserWasTouchedReplyInfor({
                commentParentId: rootCommentId,
                userWasTouched: comment.user,
            })
        )
    }
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    const updateCommentLikeToFirebase = async function () {
        if (!currentUser.uid) {
            handleShowLogin()
            return
        }
        let updateLikes = []
        if (isLiked) {
            updateLikes = comment.likes.filter((like) => like !== currentUser.uid) //delete current use
        } else {
            updateLikes = [...comment.likes, currentUser.uid] //add current user
        }
        const newNotification = {
            id: uuidv4(),
            createdAt: new Date(),
            notificationType: notification.constain.LIKES,
            comment: comment.content,
            fromUid: currentUser.uid,
            postId: post.id,
            likeType: 'comment',
            poster: post.poster,
            createPostBy: post.uid,
            isRead: false,
        }
        await updateCommentLikes(currentUser, comment.id, updateLikes, post.uid, newNotification, isLiked)
    }
    const handleDeleteOnClick = async function () {
        setShowComfirm(true)
    }

    const handleOnCancelComfirm = function () {
        setShowComfirm(false)
    }
    const handleOnComfirm = async function () {
        const deleteCommentFunc = []
        if (childrenComments?.length > 0) {
            childrenComments.forEach((childrenComment) => {
                deleteCommentFunc.push(deleteComment(childrenComment.id))
            })
        }
        await Promise.all([...deleteCommentFunc, deleteComment(comment.id)])
        dispath(toastActions.addToast({ message: 'Deleted', mode: 'success' }))
        setShowComfirm(false)
    }
    return (
        <div ref={ref} className={clsx('comment-item', 'd-flex')}>
            {/* root comments */}
            <div className={clsx('comment', 'd-flex')}>
                <ProfileContainer user={comment?.user} placement='left-start'>
                    <UserAvatar onclick={handleNavigate} height={avatarHeight} user={comment?.user} />
                </ProfileContainer>
                {showComfirm && (
                    <FullScreenModal>
                        <Comfirm
                            question='Are you sure you want to delete this comment?'
                            btnTitle='Delete'
                            onCancel={handleOnCancelComfirm}
                            onComfirm={handleOnComfirm}
                        />
                    </FullScreenModal>
                )}
                <div className={clsx('comment-content', 'd-flex')}>
                    <Button title={comment?.user?.full_name} className={clsx('name')} />
                    <p className={clsx('comment-text')}>{comment.content}</p>
                    <div className={clsx('content-bot', 'd-flex')}>
                        <span className={clsx('time')}>{convertTimeStampToDate(comment?.createdAt)}</span>
                        <Button onClick={handleReplyOnClick} title='Reply' className={clsx('action-btn')} />
                    </div>
                </div>
                <div className={clsx('comment-actions', 'd-flex')}>
                    <div>
                        <Tippy
                            // visible={true}
                            placement='left-start'
                            interactive={true}
                            render={(attrs) => (
                                <div className={clsx('action-box')} tabIndex='-1' {...attrs}>
                                    {comment.user.uid === currentUser.uid ? (
                                        <Button
                                            onClick={handleDeleteOnClick}
                                            className={clsx('comment-action-btn')}
                                            title='Delete'
                                            icon={<DeleteIcon />}
                                        />
                                    ) : (
                                        <Button
                                            onClick={handleReportOnClick}
                                            className={clsx('comment-action-btn')}
                                            title='Report'
                                            icon={<ReportIcon height='2.4rem' width='2.4rem' />}
                                        />
                                    )}
                                </div>
                            )}>
                            <button>
                                <HorizontalThreeDot className={clsx('three-dot')} />
                            </button>
                        </Tippy>
                    </div>

                    {!isLiked ? (
                        <div className={clsx('icon', 'd-flex')}>
                            <HeartAnimated
                                className={clsx('action-icon', 'heart-main', 'd-flex')}
                                onClick={updateCommentLikeToFirebase}
                            />
                            <HeartAnimated
                                className={clsx('action-icon', 'heart-background', 'd-flex')}
                                onClick={updateCommentLikeToFirebase}
                            />
                        </div>
                    ) : (
                        <HeartPrimary className={clsx('action-icon')} onClick={updateCommentLikeToFirebase} />
                    )}
                    <span className={clsx('like-count')}>{comment?.likes?.length || 0}</span>
                </div>
            </div>

            {/* children comments */}
            {childrenCommentCount > 0 && viewReplies && (
                <div className={clsx('sub-comment', 'd-flex')}>
                    {childrenComments?.map((childrenComment) => {
                        return (
                            <Comment
                                key={childrenComment.id}
                                comment={childrenComment}
                                post={post}
                                rootCommentId={rootCommentId}
                            />
                        )
                    })}
                </div>
            )}
            {isRootCommnet && childrenCommentCount > 0 && (
                <button onClick={handleRenderChildrenComments} className={clsx('view-reply-btn')}>
                    {!viewReplies ? `View more replies(${childrenCommentCount})` : 'View less replies'}
                </button>
            )}
            {showLogin && (
                <FullScreenModal handleShowPopup={handleShowLogin}>
                    <LoginPopup handleShowPopup={handleShowLogin} />
                </FullScreenModal>
            )}
        </div>
    )
})

export default memo(Comment)
