import classNames from 'classnames/bind'
import React, { useState } from 'react'
import Button from '~/components/Button'
import { LiveIcon, SearchIcon } from '~/components/Icons'
import styles from './MobileHeader.module.scss'

const clsx = classNames.bind(styles)
function MobileHeader() {
    const [followBtnActive, setFollowBtnActive] = useState()
    const handleOnClick = function (title) {
        if (title === 'follow') {
            setFollowBtnActive(true)
        } else {
            setFollowBtnActive(false)
        }
    }
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <LiveIcon className={clsx('btn')} height='3.5rem' width='3.5rem' />
            <div className={clsx('d-flex', 'mid')}>
                <Button
                    onClick={() => {
                        handleOnClick('follow')
                    }}
                    className={clsx('follow-btn', { 'btn-active': followBtnActive })}
                    title={'Following'}
                />
                <div className={clsx('vertical')}></div>
                <Button
                    onClick={() => {
                        handleOnClick('forYou')
                    }}
                    className={clsx('for-you-btn', { 'btn-active': !followBtnActive })}
                    title={'For You'}
                />
            </div>
            <SearchIcon className={clsx('btn')} height='3.5rem' width='3.5rem' />
        </div>
    )
}

export default MobileHeader
