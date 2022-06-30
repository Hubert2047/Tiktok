import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import UserAvatar from '../UserAvatar'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function Like({ like }) {
    //     const currentUser = useSelector((state) => state.user.user)

    return (
        <div className={clsx('like')}>
            <UserAvatar user={like.fromUser} height={'4.8rem'} />
        </div>
    )
}

export default Like
