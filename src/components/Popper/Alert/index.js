import classNames from 'classnames/bind'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import styles from './Alert.module.scss'
const clsx = classNames.bind(styles)
function Alert({ title, type }) {
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <IoCheckmarkDoneOutline className={clsx('icon-sucees')} />
            <h4 className={clsx('title')}> {title}</h4>
        </div>
    )
}

export default Alert
