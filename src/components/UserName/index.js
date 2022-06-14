/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { CheckIcon } from '~/components/Icons'
import { useProfileRoute } from '~/hooks'
import styles from './UserName.module.scss'
const clsx = classNames.bind(styles)
function UserName({ className, user }) {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => {
                navigate(useProfileRoute(user))
            }}
            className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('d-flex', 'name-box')}>
                <p className={clsx('name')}>{user.full_name}</p>
                {user.tick && <CheckIcon className={clsx('check-icon')} />}
            </div>
            <p className={clsx('nickname')}>{user.nickname}</p>
        </div>
    )
}

export default UserName
