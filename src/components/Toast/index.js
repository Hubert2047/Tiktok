import classNames from 'classnames/bind'
import React from 'react'
import { MdCheckCircle } from 'react-icons/md'
import styles from './Toast.module.scss'

const clsx = classNames.bind(styles)

function Toast({ mode, onClose, message, title }) {
    const Icon = MdCheckCircle
    return (
        <div onClick={onClose} className={clsx('wrapper', 'd-flex', mode)}>
            <Icon className={clsx('icon')} />
            <div className={clsx('content')}>
                <h4 className={clsx('title')}>{title}</h4>
                <span className={clsx('message')}> {message}</span>
            </div>
        </div>
    )
}

export default Toast
