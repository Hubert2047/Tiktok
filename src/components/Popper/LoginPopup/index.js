import classNames from 'classnames/bind'
import React from 'react'
import Button from '~/components/Button'
import { XIcon } from '~/components/Icons'
import { loginBtns } from '~/staticData'
import styles from './LoginPopup.module.scss'
const clsx = classNames.bind(styles)
function LoginPopup({ handleShowPopup }) {
    return (
        <div className={clsx('wrapper')}>
            <div onClick={handleShowPopup} className={clsx('close-btn-box', 'grid-center')}>
                <XIcon className={clsx('close-btn')} />
            </div>
            <h4 className={clsx('title')}>Log in to TikTok</h4>
            <div className={clsx('action-btns', 'd-flex')}>
                {loginBtns?.map((loginBtn) => (
                    <Button
                        key={loginBtn.id}
                        className={clsx('action-btn')}
                        title={loginBtn.title}
                        icon={loginBtn.icon}
                        onClick={loginBtn.onClick}
                    />
                ))}
            </div>
            <div className={clsx('bottom', 'd-flex')}>
                <p>Don’t have an account?</p>
                <Button title='Sign up' color='color-primary' />
            </div>
        </div>
    )
}

export default LoginPopup
