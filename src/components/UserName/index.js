import styles from './UserName.module.scss'
import classNames from 'classnames/bind'
import { CheckIcon } from '~/components/Icons'
const clsx = classNames.bind(styles)
function UserName({ className, fullName, tick, nickname }) {
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('d-flex', 'name-box')}>
                <p className={clsx('name')}>{fullName}</p>
                {tick && <CheckIcon className={clsx('check-icon')} />}
            </div>
            <p className={clsx('nickname')}>{nickname}</p>
        </div>
    )
}

export default UserName
