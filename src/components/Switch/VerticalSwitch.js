import classNames from 'classnames/bind'
import React from 'react'
import styles from './Switch.module.scss'

const clsx = classNames.bind(styles)

function VerticalSwitch({ checked, onClick, className }) {
    return (
        <div
            onClick={onClick}
            className={clsx('verical-switch', 'd-flex', className, { 'verical-switch-action': checked })}>
            <div className={clsx('verical-switch-inner', { 'verical-inner-action': checked })}></div>
        </div>
    )
}

export default VerticalSwitch
