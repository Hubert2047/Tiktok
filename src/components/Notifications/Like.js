/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { formatTimeNotification } from '~/helper'
import { useVideoPageRoute } from '~/hooks'
import { updateNotificationReadState } from '~/firebase'
import Image from '../Image'
import UserAvatar from '../UserAvatar'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function Like({ like, itemActive, className }) {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const hanldeOnClick = function () {
        updateNotificationReadState(currentUser, like.id)
        navigate(
            useVideoPageRoute({
                id: like.postId,
                user: { uid: like.createPostBy, full_name: like.fromUser.full_name },
            })
        )
    }
    return (
        <div className={clsx('like', 'd-flex')} onClick={hanldeOnClick}>
            <UserAvatar user={like.fromUser} height={'4.8rem'} />
            <div className={clsx('sub-content', 'd-flex')}>
                <p className={clsx('full-name', { read: !like.isRead })}>{like.fromUser.full_name}</p>
                <p className={clsx('sub-desc')}>{`liked your ${like.likeType}. ${formatTimeNotification(
                    like.createdAt
                )}`}</p>
                {like?.comment && (
                    <div className={clsx('sub-comment')}>{`${currentUser.full_name}: ${like?.comment}`}</div>
                )}
            </div>
            <div className={clsx('video-poster')}>
                <Image src={like.poster} className={clsx('img')} />
            </div>
        </div>
    )
}

export default Like
