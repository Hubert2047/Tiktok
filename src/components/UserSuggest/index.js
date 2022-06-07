import classNames from 'classnames/bind'
import { HiBadgeCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Image from '../Image'
import styles from './UserSuggest.module.scss'
const clsx = classNames.bind(styles)
function UserSuggest({ user }) {
    return (
        <Link to={`/@${user.nickname}`} className={clsx('wrapper', 'd-flex')}>
            <Image className={clsx('img')} alt='avatar' src={user.avatar} />
            <div className={clsx('content')}>
                <h4 className={clsx('title', 'd-flex')}>
                    <span> {user.full_name}</span>
                    {user.tick && <HiBadgeCheck className={clsx('title-check')} />}
                </h4>
                <p className={clsx('desc')}>{user.nickname}</p>
            </div>
        </Link>
    )
}

export default UserSuggest
