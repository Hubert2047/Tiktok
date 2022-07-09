/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { memo, useEffect, useState } from 'react'
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
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { toastActions } from '~/redux/toastSlice'
import { notification } from '~/staticData'
import Comfirm from '../Comfirm'
import Loading from '../Loading'
import { LoginPopup } from '../Popper'
import UserAvatar from '../UserAvatar'
import styles from './Comment.module.scss'

const clsx = classNames.bind(styles)
function Comment({ comment, post, rootCommentId }) {
    // console.log('re-render cmt', post.id)
    const isRootCommnet = comment.parentId === 'null' || false
    const avatarHeight = isRootCommnet ? '4rem' : '2.75rem' //if is root comment then avatar height will be bigger than children cmt
    const dispath = useDispatch()
    const inputRef = useSelector((state) => state.comment.inputRef)
    const currentUser = useSelector((state) => state.user.user)
    const [childrenComments, setChildrenComments] = useState([])
    const childrenCommentCount = childrenComments?.length || 0
    const [viewReplies, setViewReplies] = useState(false) // show all or hide cmts
    const isLiked = comment.likes.includes(currentUser.uid) // has current user liked this cmt
    const navigate = useNavigate()
    // console.log('re-render comment', comment.id)
    const updateChildrenComments = function (data) {
        setChildrenComments(data)
    }
    useEffect(() => {
        try {
            getComments({
                postId: post.id,
                callback: updateChildrenComments,
                parentId: comment.id,
            }) //get all children comments
        } catch (e) {
            console.log(e)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])
    const handleRenderChildrenComments = function () {
        //show or hide all children cmt
        setViewReplies((prev) => !prev)
    }
    const handleNavigate = function () {
        //change route
        navigate(useProfileRoute(comment.user))
    }

    const handleReportOnClick = function () {
        dispath(toastActions.addToast({ message: 'Reported!', mode: 'success' }))
    }
    const handleReplyOnClick = function () {
        //push reply user to redux then input could know what use have to send notification
        inputRef?.focus()
        dispath(
            commentActions.setLastUserWasTouchedReplyInfor({
                commentParentId: rootCommentId,
                userWasTouched: comment.user,
            })
        )
    }
    const updateCommentLikeToFirebase = async function () {
        if (!currentUser.uid) {
            dispath(containerPortalActions.setComponent({ component: <LoginPopup />, onClickOutside: true }))
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
        dispath(
            containerPortalActions.setComponent({
                component: (
                    <Comfirm
                        question='Are you sure you want to delete this comment?'
                        subMitTitle='Delete'
                        onSubmit={handleOnDeleteComfirm}
                    />
                ),
                onClickOutside: true,
            })
        )
    }

    const handleOnDeleteComfirm = async function () {
        dispath(containerPortalActions.setComponent({ component: <Loading />, onClickOutside: true }))
        const deleteCommentFunc = []
        if (childrenComments?.length > 0) {
            //if delete cmt is a parent cmt, we also have to delete all children
            childrenComments.forEach((childrenComment) => {
                deleteCommentFunc.push(deleteComment(childrenComment.id))
            })
        }
        try {
            await Promise.all([...deleteCommentFunc, deleteComment(comment.id)])
            dispath(toastActions.addToast({ message: 'Deleted', mode: 'success' }))
            dispath(containerPortalActions.setComponent(null))
        } catch (error) {
            console.log(error)
            dispath(containerPortalActions.setComponent(null))
        }
    }
    return (
        <div className={clsx('comment-item', 'd-flex')}>
            {/* root comments */}
            <div className={clsx('comment', 'd-flex')}>
                <ProfileContainer user={comment?.user} placement='left-start'>
                    <UserAvatar onclick={handleNavigate} height={avatarHeight} user={comment?.user} />
                </ProfileContainer>
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
                                            icon={<DeleteIcon className={clsx('delete-icon')} />}
                                        />
                                    ) : (
                                        <Button
                                            onClick={handleReportOnClick}
                                            className={clsx('comment-action-btn')}
                                            title='Report'
                                            icon={<ReportIcon height='24px' width='24px' />}
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
        </div>
    )
}

export default memo(Comment)
