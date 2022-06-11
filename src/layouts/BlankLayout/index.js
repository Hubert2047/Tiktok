import classNames from 'classnames/bind'
import styles from './BlankLayout.module.scss'
const clsx = classNames.bind(styles)
function BlankLayout({ children }) {
    return <div className={clsx('wrapper')}>{children}</div>
}

export default BlankLayout
