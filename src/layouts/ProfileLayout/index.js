import classNames from 'classnames/bind'
import React from 'react'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import styles from './ProfileLayout.module.scss'

const clsx = classNames.bind(styles)
function ProfileLayout({ children }) {
    return (
        <div className={clsx('wrapper')}>
            <Header className={clsx('header')} />
            <div className={clsx('container')}>
                <div>
                    <Sidebar className={clsx('sidebar')} />
                </div>
                <div className={clsx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default ProfileLayout
