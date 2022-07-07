import classNames from 'classnames/bind'
import { forwardRef, memo } from 'react'
import Image from '~/components/Image'
import styles from './UserAvatar.module.scss'
const clsx = classNames.bind(styles)
const UserAvatar = forwardRef(({ user, onClick, className, height = '32px', showLive }, ref) => {
    return (
        <div onClick={onClick} className={clsx('wrapper')}>
            <Image
                style={{ height: height, width: height }}
                src={user?.avatar}
                alt={'avatar'}
                className={clsx('avatar', className, { isLive: user?.isLive && showLive })}
            />
        </div>
    )
})

export default memo(UserAvatar)
