import Tippy from '@tippyjs/react/headless'
import className from 'classnames/bind'
import { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getNotifications } from '~/firebase'
import { notification as _notification } from '~/staticData'
import Button from '../Button'
import NotificationBlank from './NotificationBlank'
import NotificationItem from './NotificationItem'
import styles from './Notifications.module.scss'

const clsx = className.bind(styles)
function Notifications({ children }, ref) {
    const currentUser = useSelector((state) => state.user.user)
    const [itemActive, setItemActive] = useState({
        id: 1,
        title: _notification.constain.All,
    })
    const [notifications, setNotifications] = useState([])
    const [currentNotificationGroup, setCurrentNotificationGroup] = useState([])

    const handleOnClickItem = function (item) {
        setItemActive(item)
    }
    useEffect(() => {
        getNotifications(currentUser, (data) => {
            setNotifications(data)
        })
    }, [currentUser])
    useEffect(() => {
        setCurrentNotificationGroup(() => {
            if (itemActive.title === _notification.constain.All) return notifications
            return notifications.filter((notification) => notification.notificationType === itemActive.title)
        })
    }, [notifications, itemActive])

    const renderContainer = function () {
        return (
            <div className={clsx('container')} tabIndex='-1'>
                <div className={clsx('header')}>Notifications</div>
                <div className={clsx('group-container', 'd-flex')}>
                    {_notification.GROUP_ITEMS.map((item) => (
                        <Button
                            onClick={() => handleOnClickItem(item)}
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
                            />
                        ))
                    ) : (
                        <NotificationBlank currentGroup={itemActive.title} />
                    )}
                </div>
            </div>
        )
    }
    return (
        <div ref={ref} className={clsx('wrapper')}>
            <Tippy offset={[0, 15]} interactive={true} visible={true} render={renderContainer}>
                <div>{children}</div>
            </Tippy>
        </div>
    )
}

export default forwardRef(Notifications)
