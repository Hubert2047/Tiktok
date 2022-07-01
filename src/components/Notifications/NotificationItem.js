import React from 'react'
import { notification as _notification } from '~/staticData'
import Like from './Like'
import Mention from './Mention'
import NotificationComment from './NotificationComment'
import NotificationFollower from './NotificationFollower'

function NotificationItem({ notification, itemActive, className }) {
    let CurrentNotificationItem
    switch (notification.notificationType) {
        case _notification.constain.LIKES:
            CurrentNotificationItem = () => <Like like={notification} itemActive={itemActive} className={className} />
            break
        case _notification.constain.COMMENTS:
            CurrentNotificationItem = () => (
                <NotificationComment comment={notification} itemActive={itemActive} className={className} />
            )
            break
        case _notification.constain.MENTIONS:
            CurrentNotificationItem = () => (
                <Mention mention={notification} itemActive={itemActive} className={className} />
            )
            break
        case _notification.constain.FOLLOWERS:
            CurrentNotificationItem = () => (
                <NotificationFollower follower={notification} itemActive={itemActive} className={className} />
            )
            break
        default:
    }
    return <CurrentNotificationItem />
}

export default NotificationItem
