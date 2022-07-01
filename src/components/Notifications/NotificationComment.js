import classNames from 'classnames/bind'
import { formatTimeNotification } from '~/helper'
import Image from '../Image'
import UserAvatar from '../UserAvatar'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function NotificationComment({ comment }) {
    return (
        <div className={clsx('like', 'd-flex')}>
            <UserAvatar user={comment.fromUser} height={'4.8rem'} />
            <div className={clsx('sub-content', 'd-flex')}>
                <p className={clsx('full-name')}>{comment.fromUser.full_name}</p>
                <p className={clsx('sub-desc')}>{`commented on your video ${formatTimeNotification(
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
