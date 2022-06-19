import classNames from 'classnames/bind'
import React from 'react'
import styles from './MobileHeader.module.scss'

const clsx = classNames.bind(styles)
function MobileHeader() {
    return <div className={clsx('wrapper')}></div>
}

export default MobileHeader
