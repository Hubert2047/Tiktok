import styles from './UserAvatar.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Image from '~/components/Image'
import config from '~/config'
const clsx = classNames.bind(styles)
function UserAvatar({ user, className }) {
    return (
        <Link to={config.routes.profile(user[config.PROFILE_ROUTE])} className={clsx('wrapper')}>
            <Image src={user.avatar} alt={'avatar'} className={clsx('avatar', className, { isLive: user.isLive })} />
        </Link>
    )
}

export default UserAvatar
