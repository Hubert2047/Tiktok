import styles from './UserAvatar.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Image from '~/components/Image'
const clsx = classNames.bind(styles)
function UserAvatar({ src, nickname, className, isLive = false }) {
    return (
        <Link to={`/@:${nickname}`} className={clsx('wrapper')}>
            <Image src={src} alt={'avatar'} className={clsx(className, { isLive: isLive })} />
        </Link>
    )
}

export default UserAvatar
