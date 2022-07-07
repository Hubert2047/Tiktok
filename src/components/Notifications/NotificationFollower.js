/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateNotificationReadState } from '~/firebase'
import { formatTimeNotification, handleFollowingUser } from '~/helper'
import { useProfileRoute } from '~/hooks'
import Button from '../Button'
import { FollowBackIcon } from '../Icons'
import UserAvatar from '../UserAvatar'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function NotificationFollower({ follower, currentUser }) {
    const [isFollowing, setIsFollowing] = useState(currentUser?.following?.includes(follower?.fromUser?.uid))
    useEffect(() => {
        setIsFollowing(currentUser.following.includes(follower.fromUser.uid))
    }, [currentUser, follower])
    const navigate = useNavigate()
    const handleFollowing = async function (e) {
        try {
            await handleFollowingUser(currentUser, follower.fromUser, isFollowing)
            // data is realtime so we dont have to manually isFollowing state.
        } catch (error) {
            console.log(error)
        }
    }
    const handleNotificationOnClick = function () {
        if (!follower?.isRead) {
            updateNotificationReadState(currentUser, follower.id)
        }
        navigate(useProfileRoute(follower.fromUser))
    }
    return (
        <div onClick={handleNotificationOnClick} className={clsx('follower', 'd-flex')}>
            <UserAvatar user={follower.fromUser} height={'4.8rem'} />
            <div className={clsx('follower-content', 'd-flex')}>
                <p className={clsx('full-name', { read: !follower.isRead })}>{follower.fromUser.full_name}</p>
                <p className={clsx('desc')}>{`started following you. ${formatTimeNotification(follower.createdAt)}`}</p>
            </div>
            {!isFollowing ? (
                <Button
                    title='Follow Back'
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleFollowing()
                    }}
                    bg='bg-primary'
                    color='color-white'
                    size='size-sm'
                    className={clsx('follow-btn')}
                />
            ) : (
                <Button
                    title='Friends'
                    // bg='bg-grey'
                    icon={<FollowBackIcon />}
                    border='border-grey'
                    color='color-black'
                    size='size-sm'
                    className={clsx('follow-btn')}
                />
            )}
        </div>
    )
}

export default NotificationFollower
