import Tippy from '@tippyjs/react/headless'
import className from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getNotifications } from '~/firebase'
import { notification as _notification } from '~/staticData'
import NotificationMenu from './NotificationMenu'
import styles from './Notifications.module.scss'

const clsx = className.bind(styles)
function Notifications({ children }, ref) {
    const currentUser = useSelector((state) => state.user.user)
    const [itemActive, setItemActive] = useState({
        id: 1,
        title: _notification.constain.All,
    })
    const [visible, setVisible] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [currentNotificationGroup, setCurrentNotificationGroup] = useState([])

    const handleOnClickItem = function (item) {
        setItemActive(item)
    }
    useEffect(() => {
        console.log('run notification')
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

    const renderMenu = function () {
        return (
            <>
                {visible && (
                    <NotificationMenu
                        currentNotificationGroup={currentNotificationGroup}
                        itemActive={itemActive}
                        handleOnClickItem={handleOnClickItem}
                        currentUser={currentUser}
                    />
                )}
            </>
        )
    }
    const handleOnClick = function (e) {
        e.stopPropagation()
        setVisible((prev) => !prev)
    }
    return (
        <div className={clsx('wrapper')}>
            <Tippy offset={[0, 14]} interactive={true} visible={visible} render={renderMenu}>
                <div onClick={handleOnClick}>{children} </div>
            </Tippy>
        </div>
    )
}

export default Notifications
