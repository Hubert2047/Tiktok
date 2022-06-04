import classNames from 'classnames/bind'
import { HiBadgeCheck } from 'react-icons/hi'
import images from '~/assets/images'
import styles from './UserSuggest.module.scss'
const clsx = classNames.bind(styles)
function UserSuggest({ user }) {
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <img className={clsx('img')} alt='avatar' src={user.img || images.defaultAvatar} />
            <div className={clsx('content')}>
                <h4 className={clsx('title', 'd-flex')}>
                    <span> {user.title || 'Hubert'}</span>
                    <HiBadgeCheck className={clsx('title-check')} />
                </h4>
                <p className={clsx('desc')}>{user.desc || '😀 hallo'}</p>
            </div>
        </div>
    )
}

export default UserSuggest
