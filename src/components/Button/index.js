import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'
const clsx = classNames.bind(styles)

//type:  btn-primary btn-grey btn-outline btn-rounded => use to change component hover style or order-radius
//size:  size-sm  size-md  size-big => use to change component size
//to : Link
//href: a
//default: button

function Button({
    to,
    href,
    type,
    size,
    icon,
    bg,
    color,
    border,
    disabled,
    title,
    className,
    rightIcon,
    onClick,
    style,
    fill,
}) {
    let Comp = 'button'
    const props = {
        onClick,
    }
    if (disabled) {
        delete props.onClick
    }
    if (to) {
        Comp = Link
        props.to = to
    } else if (href) {
        Comp = 'a'
        props.href = href
    }
    const classes = clsx('wrapper', 'd-flex', {
        [className]: className,
        [type]: type,
        [size]: size,
        [bg]: bg,
        [color]: color,
        [border]: border,
        disabled: disabled,
    })
    return (
        <Comp className={classes} style={style} {...props}>
            {icon && !rightIcon && <div className={clsx('icon', 'd-flex')}>{icon}</div>}
            {title && <span className={clsx('title', 'ellipsis')}>{title}</span>}
            {icon && rightIcon && <div className={clsx('icon', 'd-flex')}>{icon}</div>}
        </Comp>
    )
}

export default Button
