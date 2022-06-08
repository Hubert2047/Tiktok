import classNames from 'classnames/bind'
import { HiBadgeCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Image from '../Image'
import styles from './UserSearch.module.scss'
import config from '~/config'
import PropTypes from 'prop-types'
const clsx = classNames.bind(styles)
function UserSearch({ user }) {
    return (
        <Link to={config.routes.profile(user[config.PROFILE_ROUTE])} className={clsx('wrapper', 'd-flex')}>
            {/* <UserAvatar className={clsx('img')} alt='avatar' src={user.avatar} /> */}
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

UserSearch.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string,
        tick: PropTypes.bool,
        nickname: PropTypes.string,
        full_name: PropTypes.string,
    }),
}
export default UserSearch
