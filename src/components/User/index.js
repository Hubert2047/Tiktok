import classNames from 'classnames/bind'
import { forwardRef } from 'react'
import UserName from '~/components/UserName'
import Image from '../Image'
import UserAvatar from '../UserAvatar'
import styles from './User.module.scss'
const clsx = classNames.bind(styles)
const User = forwardRef(({ user }, ref) => {
    return (
        <div ref={ref} className={clsx('wrapper', 'd-flex')}>
            <UserAvatar
                className={clsx('avatar')}
                src={user.avatar}
                alt={'user'}
                nickname={user.nickname}
                isLive={user.isLive}
            />
            {/* <Image className={clsx('avatar', { online: user.isLive })} src={user.avatar} alt={'user'} /> */}
            <UserName tick={user.tick} fullName={user.full_name} nickname={user.nickname} />
        </div>
    )
})
export default User
