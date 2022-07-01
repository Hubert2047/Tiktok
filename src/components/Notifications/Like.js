import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { formatTimeNotification } from '~/helper'
import Image from '../Image'
import UserAvatar from '../UserAvatar'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function Like({ like, itemActive, className }) {
    // console.log('likes', likes)
    const currentUser = useSelector((state) => state.user.user)

    return (
        <div className={clsx('like', 'd-flex')}>
            <UserAvatar user={like.fromUser} height={'4.8rem'} />
            <div className={clsx('sub-content', 'd-flex')}>
                <p className={clsx('full-name')}>{like.fromUser.full_name}</p>
                <p className={clsx('sub-desc')}>{`liked your ${like.likeType} ${formatTimeNotification(
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
