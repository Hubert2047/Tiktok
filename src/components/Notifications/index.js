import Tippy from '@tippyjs/react/headless'
import className from 'classnames/bind'
import { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getNotifications } from '~/firebase'
import { notification as _notification } from '~/staticData'
import Button from '../Button'
import Like from './Like'
import styles from './Notifications.module.scss'

// const All = 'All'
// const Likes = 'Likes'
// const Comments = 'Comments'
// const Mentions = 'Mentions'
// const Followers = 'Followers'

const clsx = className.bind(styles)
function Notifications({ children }, ref) {
    const [itemActive, setItemActive] = useState({
        id: 1,
        title: _notification.All,
    })
    const [notifications, setNotifications] = useState([])
    //     const [likes,setLikes] = useState([])
    const currentUser = useSelector((state) => state.user.user)

    const handleOnClickItem = function (item) {
        setItemActive(item)
    }
    useEffect(() => {
        getNotifications(currentUser, (data) => {
            setNotifications(data)
        })
    }, [currentUser])
    //     useEffect(() => {
    //         if (notifications?.length < 1) return

    //     }, [itemActive, notifications])

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
                <div className={clsx('content', 'd-flex')}>
                    <div>
                        {(itemActive.title === _notification.Likes || itemActive.title === _notification.All) &&
                            notifications
                                ?.filter((notification) => notification.notificationType === _notification.Likes)
                                ?.map((like) => <Like key={like.id} like={like} />)}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div ref={ref} className={clsx('wrapper')}>
            <Tippy interactive={true} visible={true} render={renderContainer}>
                <div>{children}</div>
            </Tippy>
        </div>
    )
}

export default forwardRef(Notifications)
