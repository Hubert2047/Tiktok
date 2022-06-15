/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import { HeartOutLine, HorizontalThreeDot } from '~/components/Icons'
import ProfileContainer from '~/components/ProfileContainer'
import { deleteComment, getComments } from '~/firebase'
import { useProfileRoute } from '~/hooks'
import { commentActions } from '~/redux/commentSlice'
import UserAvatar from '../UserAvatar'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function Comment({ comment, postId, rootCommentId }) {
    const isRootCommnet = comment.parentId === 'null' || false
    const avatarHeight = isRootCommnet ? '4rem' : '2.75rem'
    const dispath = useDispatch()
    const inputRef = useSelector((state) => state.comment.inputRef)
    const currentUser = useSelector((state) => state.user.user)
    const [childrenComments, setChildrenComments] = useState([])
    const childrenCommentCount = childrenComments?.length || 0
    const [viewReplies, setViewReplies] = useState(false)
    const navigate = useNavigate()
    // console.log('re-render comment')
    useEffect(() => {
        try {
            getComments(
                postId,
                (data) => {
                    setChildrenComments(data)
                },
                comment.id
            )
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
    const handleDeleteOnClick = function () {
        deleteComment(comment.id)
    }
    const handleReplyOnClick = function () {
        inputRef?.focus()
        dispath(commentActions.setLastUserWasTouchedReply(comment.user))
        dispath(commentActions.setCurrentParentId(rootCommentId))
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
                        <span className={clsx('time')}>4h</span>
                        <Button onClick={handleReplyOnClick} title='Reply' className={clsx('action-btn')} />
                        {comment.uid === currentUser.uid && (
                            <Button onClick={handleDeleteOnClick} title='Delete' className={clsx('action-btn')} />
                        )}
                    </div>
                </div>
                <div className={clsx('comment-actions', 'd-flex')}>
                    <HorizontalThreeDot className={clsx('three-dot')} />
                    <HeartOutLine className={clsx('action-icon')} />
                    <span>{comment?.likes?.length || 0}</span>
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
                                postId={postId}
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
