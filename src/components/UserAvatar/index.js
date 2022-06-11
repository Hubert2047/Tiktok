import classNames from 'classnames/bind'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import Image from '~/components/Image'
import config from '~/config'
import styles from './UserAvatar.module.scss'

const clsx = classNames.bind(styles)
const UserAvatar = forwardRef(({ user, className, height = '3.2rem', showLive }, ref) => {
    return (
        <Link ref={ref} to={config.routes.profile(user[config.PROFILE_ROUTE])} className={clsx('wrapper')}>
            <Image
                style={{ height: height }}
                src={user.avatar}
                alt={'avatar'}
                className={clsx('avatar', className, { isLive: user.isLive && showLive })}
            />
        </Link>
    )
})

export default UserAvatar
