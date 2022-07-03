import classNames from 'classnames/bind'
import React from 'react'
import { CreateVideoIcon, HomeIcon, InboxIcon, ProfileIcon, SearchIcon } from '~/components/Icons'
import styles from './MobileFooter.module.scss'

const clsx = classNames.bind(styles)

function MobileFooter({ className }) {
    return (
        <div className={clsx('wrapper', 'd-flex', 'className')}>
            <HomeIcon className={clsx('btn', 'home-btn')} height={'40px'} width={'40px'} />
            <SearchIcon className={clsx('btn', 'search-btn')} height={'40px'} width={'40px'} />
            <CreateVideoIcon className={clsx('btn')} />
            {/* <div className={clsx('create-video-btn')}></div> */}
            <InboxIcon className={clsx('btn', 'inbox-btn')} height={'40px'} width={'40px'} />
            <ProfileIcon className={clsx('btn', 'profile-btn')} height={'35px'} width={'35px'} />
        </div>
    )
}

export default MobileFooter
