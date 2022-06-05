import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './MenuItem.module.scss'
const clsx = classNames.bind(styles)
function MenuItem({ item, onMenuItemClick, ...rest }) {
    const classes = clsx('item', { separate: item.separate })
    return (
        <Button
            href={item.href}
            to={item.to}
            title={item.title}
            icon={item.icon}
            className={classes}
            onClick={() => onMenuItemClick(item)}
            {...rest}></Button>
    )
}

export default MenuItem
