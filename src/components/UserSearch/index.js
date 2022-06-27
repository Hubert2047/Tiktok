/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { HiBadgeCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useProfileRoute } from '~/hooks'
import UserAvatar from '../UserAvatar'
import styles from './UserSearch.module.scss'
const clsx = classNames.bind(styles)
function UserSearch({ user, onClearResults }) {
    const navigate = useNavigate()
    const handleNavigate = function () {
        navigate(useProfileRoute(user))
        onClearResults()
    }
    return (
        <div className={clsx('wrapper', 'd-flex')} onClick={handleNavigate}>
            <UserAvatar user={user} className={clsx('img')} height={'4rem'} />
            <div className={clsx('content')}>
                <h4 className={clsx('title', 'd-flex')}>
                    <span> {user.full_name}</span>
                    {user.tick && <HiBadgeCheck className={clsx('title-check')} />}
                </h4>
                <p className={clsx('desc')}>{user.nickname}</p>
            </div>
        </div>
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
