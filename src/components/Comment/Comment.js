/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { useState } from 'react'
import Button from '~/components/Button'
import { DownIcon, HeartOutLine, HorizontalThreeDot } from '~/components/Icons'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '../UserAvatar'
import { useNavigate } from 'react-router-dom'
import { useProfileRoute } from '~/hooks'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function Comment({ comment, parentId = null }) {
    const avatarheight = parentId ? '2.75rem' : '4rem'
    const [viewAll, setViewAll] = useState(false)
    const navigate = useNavigate()
    const subComment = comment?.subcomment?.length || 0
    const handleViewMoreOnClick = function () {
        setViewAll(true)
    }
    const handleNavigate = function () {
        navigate(useProfileRoute(comment.user))
    }
    return (
        <div className={clsx('comment-item', 'd-flex')}>
            <div className={clsx('comment', 'd-flex')}>
                <ProfileContainer user={comment.user}>
                    <UserAvatar onclick={handleNavigate} height={avatarheight} user={comment.user} />
                </ProfileContainer>
                <div className={clsx('comment-content', 'd-flex')}>
                    <Button title={comment.user?.full_name} className={clsx('name')} />
                    <p className={clsx('comment-text')}>{comment.text}</p>
                    <div className={clsx('content-bot', 'd-flex')}>
                        <span className={clsx('time')}>4h</span>
                        <Button title='Reply' className={clsx('reply-btn')} />
                    </div>
                </div>
                <div className={clsx('comment-actions', 'd-flex')}>
                    <HorizontalThreeDot className={clsx('three-dot')} />
                    <HeartOutLine className={clsx('action-icon')} />
                    <span>58</span>
                </div>
            </div>
            {subComment > 0 && (
                <div className={clsx('sub-comment', 'd-flex')}>
                    <Comment comment={comment.subcomment[0]} parentId={comment.id} />
                    {viewAll &&
                        comment.subcomment.slice(1).map((subComment) => {
                            return <Comment key={subComment.id} comment={subComment} parentId={comment.id} />
                        })}
                    {!viewAll && subComment > 1 && (
                        <Button
                            onClick={handleViewMoreOnClick}
                            title={`View more replies (${subComment - 1})`}
                            icon={<DownIcon />}
                            rightIcon
                            className={clsx('view-more-btn')}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Comment
