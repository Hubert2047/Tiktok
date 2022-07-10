import className from 'classnames/bind'
import React from 'react'
import { notification as _notification } from '~/staticData'
import useOverflow from '../../hooks/useOverflow'
import Button from '../Button'
import NotificationBlank from './NotificationBlank'
import NotificationItem from './NotificationItem'
import styles from './Notifications.module.scss'
const clsx = className.bind(styles)

function NotificationMenu({ currentNotificationGroup, itemActive, handleOnClickItem, currentUser }) {
    useOverflow()
    return (
        <div className={clsx('notification-menu')}>
            <div className={clsx('container')}>
                <div className={clsx('header')}>Notifications</div>
                <div className={clsx('group-container', 'd-flex')}>
                    {_notification.GROUP_ITEMS.map((item) => (
                        <Button
                            onClick={(e) => handleOnClickItem(item, e)}
                            key={item.id}
                            className={clsx('group-item', { 'group-item-active': itemActive.id === item.id })}
                            title={item.title}
                            color='color-black'
                        />
                    ))}
                </div>
                <div className={clsx('main-content', 'd-flex')}>
                    {currentNotificationGroup?.length ? (
                        currentNotificationGroup?.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                itemActive={itemActive}
                                currentUser={currentUser}
                            />
                        ))
                    ) : (
                        <NotificationBlank currentGroup={itemActive.title} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default NotificationMenu
