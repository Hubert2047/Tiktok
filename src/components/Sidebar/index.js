import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
const clsx = classNames.bind(styles)
function Sidebar() {
    return <div className={clsx('wrapper')}>Sidebar</div>
}

export default Sidebar
