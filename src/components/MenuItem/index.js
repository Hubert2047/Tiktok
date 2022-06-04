import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './MenuItem.module.scss'
const clsx = classNames.bind(styles)
function MenuItem({ item }) {
    return (
        <div className={clsx('wrapper')}>
            <Button title={item.title} icon={item.icon} className={clsx('item')}></Button>
        </div>
    )
}

export default MenuItem
