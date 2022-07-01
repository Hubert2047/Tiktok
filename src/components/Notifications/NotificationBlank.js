import classNames from 'classnames/bind'
import React from 'react'
import { notification as _notification } from '~/staticData'
import { LikeIcon, MentionIcon, NotificationCommentIcon, NotificationFollowerIcon } from '../Icons/index'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function NotificationBlank({ currentGroup }) {
    let currentComp
    switch (currentGroup) {
        case _notification.constain.LIKES:
            currentComp = {
                icon: <LikeIcon />,
                title: 'Like on your videos',
                desc: 'When someone likes one of your videos, you will see it here',
            }
            break
        case _notification.constain.COMMENTS:
            currentComp = {
                icon: <NotificationCommentIcon />,
                title: 'Comments on your videos',
                desc: 'When someone comments on one of your videos, you will see it here',
            }
            break
        case _notification.constain.MENTIONS:
            currentComp = {
                icon: <MentionIcon />,
                title: 'Mentions of you',
                desc: 'When someone mentions on you, you will see in here',
            }
            break
        case _notification.constain.FOLLOWERS:
            currentComp = {
                icon: <NotificationFollowerIcon />,
                title: 'New followers',
                desc: 'When someone new follows you, you will see it here',
            }
            break
        default:
            currentComp = {
                icon: <NotificationFollowerIcon />,
                title: 'All active',
                desc: 'Notifications about your account will appear here.',
            }
    }
    return (
        <div className={clsx('notification-blank', 'd-flex')}>
            {currentComp.icon}
            <h4 className={clsx('notification-blank-title')}>{currentComp.title}</h4>
            <p className={clsx('notification-blank-desc')}>{currentComp.desc}</p>
        </div>
    )
}

export default NotificationBlank
