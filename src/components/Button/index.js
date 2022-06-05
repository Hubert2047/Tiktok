import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'
const clsx = classNames.bind(styles)
function Button({ to, href, type, size, icon, title, className, onClick, check }) {
    let Comp = 'button'
    const props = {
        onClick,
    }
    if (to) {
        Comp = Link
        props.to = to
    } else if (href) {
        Comp = 'a'
        props.href = href
    }
    const classes = clsx('wrapper', 'd-flex', { [className]: className, [type]: type, [size]: size })
    return (
        <Comp className={classes} {...props}>
            {icon && <div className={clsx('icon', 'd-flex')}>{icon}</div>}
            <span className={clsx('title')}>{title}</span>
        </Comp>
    )
}

export default Button
