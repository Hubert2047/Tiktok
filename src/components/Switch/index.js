import classNames from 'classnames/bind'
import React from 'react'
import styles from './Switch.module.scss'

const clsx = classNames.bind(styles)

function Switch({ checked, onClick, className }) {
    return (
        <div onClick={onClick} className={clsx('switch', 'd-flex', className, { 'switch-action': checked })}>
            <div className={clsx('switch-inner', { 'inner-action': checked })}></div>
        </div>
    )
}

export default Switch
