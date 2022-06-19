import classNames from 'classnames/bind'
import React from 'react'
import { BookMarkIcon, HeartIcon, MobileMessengerIcon, MobileShareIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { formatCountNumber } from '~/helper'
import styles from './MobileSidebar.module.scss'
const clsx = classNames.bind(styles)
function MobileSidebar({ className, post }) {
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('avatar-box')}>
                <Image className={clsx('avatar')} src={post?.user.avatar} />
                <div className={clsx('add-icon')}></div>
                {/* <MobileAddIcon className={clsx('add-icon')} /> */}
            </div>
            <div className={clsx('btn-box', 'd-flex')}>
                <HeartIcon className={clsx('heart-btn', 'btn')} />
                <span>{formatCountNumber(post?.likes)}</span>
            </div>
            <div className={clsx('btn-box', 'd-flex')}>
                <MobileMessengerIcon className={clsx('comment-btn', 'btn')} />
                <span>{formatCountNumber(4241)}</span>
            </div>
            <div className={clsx('btn-box', 'd-flex')}>
                <BookMarkIcon className={clsx('bookmark-btn', 'btn')} />
                <span>{formatCountNumber(post?.bookmark)}</span>
            </div>
            <div className={clsx('btn-box', 'd-flex')}>
                <MobileShareIcon className={clsx('share-btn', 'btn')} />
                <span>{formatCountNumber(post?.shares)}</span>
            </div>
        </div>
    )
}

export default MobileSidebar
