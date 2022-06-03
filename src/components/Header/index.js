import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const clsx = classNames.bind(styles)
function Header() {
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('inner')}>
                {/* logo */}
                {/* search */}
            </div>
        </div>
    )
}

export default Header
