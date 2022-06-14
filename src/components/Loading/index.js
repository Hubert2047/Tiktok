import React from 'react'
import classNames from 'classnames/bind'
import styles from './Loading.module.scss'
const clsx = classNames.bind(styles)
function Loading() {
    return <div className={clsx('wrapper')}></div>
}

export default Loading
