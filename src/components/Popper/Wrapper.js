import classNames from 'classnames/bind'
import styles from './Popper.module.scss'
const clsx = classNames.bind(styles)
function Wrapper({ children, className }) {
    return <div className={clsx('wrapper', 'd-flex', `${className}`)}>{children}</div>
}

export default Wrapper
