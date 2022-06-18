import classNames from 'classnames/bind'
import React from 'react'
import { CreateVideoIcon, HomeIcon, InboxIcon, ProfileIcon, SearchIcon } from '~/components/Icons'
import styles from './MobileFooter.module.scss'

const clsx = classNames.bind(styles)

function MobileFooter({ className }) {
    return (
        <div className={clsx('wrapper', 'd-flex', 'className')}>
            <HomeIcon className={clsx('btn', 'home-btn')} height={'4rem'} width={'4rem'} />
            <SearchIcon className={clsx('btn', 'search-btn')} height={'4rem'} width={'4rem'} />
            <CreateVideoIcon />
            {/* <div className={clsx('create-video-btn')}></div> */}
            <InboxIcon className={clsx('btn', 'inbox-btn')} height={'4rem'} width={'4rem'} />
            <ProfileIcon className={clsx('btn', 'profile-btn')} height={'3.5rem'} width={'3.5rem'} />
        </div>
    )
}

export default MobileFooter
