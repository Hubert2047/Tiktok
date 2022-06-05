import classNames from 'classnames/bind'
import { IoIosArrowBack } from 'react-icons/io'
import styles from './MenuHeader.module.scss'

const clsx = classNames.bind(styles)
function MenuHeader({ title, onBack }) {
    return (
        <header className={clsx('wrapper')} onClick={onBack}>
            <IoIosArrowBack className={clsx('icon')} />
            <h4 className={clsx('title')}>{title}</h4>
        </header>
    )
}

export default MenuHeader
