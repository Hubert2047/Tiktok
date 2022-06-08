import styles from './UserName.module.scss'
import classNames from 'classnames/bind'
import { CheckIcon } from '~/components/Icons'
import { Link } from 'react-router-dom'
import config from '~/config'
const clsx = classNames.bind(styles)
function UserName({ className, user }) {
    return (
        <Link to={config.routes.profile(user[config.PROFILE_ROUTE])} className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('d-flex', 'name-box')}>
                <p className={clsx('name')}>{user.full_name}</p>
                {user.tick && <CheckIcon className={clsx('check-icon')} />}
            </div>
            <p className={clsx('nickname')}>{user.nickname}</p>
        </Link>
    )
}

export default UserName
