import classNames from 'classnames/bind'
import { formatTimeNotification } from '~/helper'
import Button from '../Button'
import UserAvatar from '../UserAvatar'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function NotificationFollower({ follower }) {
    return (
        <div className={clsx('follower', 'd-flex')}>
            <UserAvatar user={follower.fromUser} height={'4.8rem'} />
            <div className={clsx('follower-content', 'd-flex')}>
                <p className={clsx('full-name')}>{follower.fromUser.full_name}</p>
                <p className={clsx('desc')}>{`started following you. ${formatTimeNotification(follower.createdAt)}`}</p>
            </div>
            <Button
                title='Follow Back'
                bg='bg-primary'
                color='color-white'
                size='size-sm'
                className={clsx('follow-btn')}
            />
        </div>
    )
}

export default NotificationFollower
