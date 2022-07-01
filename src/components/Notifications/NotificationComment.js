/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateNotificationReadState } from '~/firebase'
import { formatTimeNotification } from '~/helper'
import { useVideoPageRoute } from '~/hooks'
import Image from '../Image'
import UserAvatar from '../UserAvatar'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function NotificationComment({ comment }) {
    const currentUser = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    const hanldeOnClick = async function () {
        try {
            updateNotificationReadState(currentUser, comment.id)
            navigate(
                useVideoPageRoute({
                    id: comment.postId,
                    user: { uid: comment.creatPostBy, full_name: currentUser.full_name },
                })
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={clsx('comment', 'd-flex')} onClick={hanldeOnClick}>
            <UserAvatar user={comment.fromUser} height={'4.8rem'} />
            <div className={clsx('sub-content', 'd-flex')}>
                <p className={clsx('full-name', { read: !comment.isRead })}>{comment.fromUser.full_name}</p>
                <p className={clsx('sub-desc')}>{`commented on your video. ${formatTimeNotification(
                    comment.createdAt
                )}`}</p>
                <div className={clsx('sub-comment')}>{`${comment.fromUser.full_name}: ${comment?.comment}`}</div>
            </div>
            <div className={clsx('video-poster')}>
                <Image src={comment.poster} className={clsx('img')} />
            </div>
        </div>
    )
}

export default NotificationComment
