import classNames from 'classnames/bind'
import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { XIcon } from '~/components/Icons'
import { getUser, addUser, getPosts } from '~/firebase'
import { headerActions } from '~/redux/headerSlice'
import { userActions } from '~/redux/userSlice'
import { loginFeatureBtns } from '~/staticData'
import styles from './LoginPopup.module.scss'
const clsx = classNames.bind(styles)
function LoginPopup({ handleShowPopup }) {
    const dispath = useDispatch()
    const handleLogin = async function (handleLoginFeature) {
        try {
            const data = await handleLoginFeature()
            let user = await getUser(data.uid)
            if (!user) {
                user = { full_name: data.displayName, avatar: data.photoURL, uid: data.uid }
                addUser(user)
            }
            dispath(userActions.setUser(user))
            dispath(headerActions.setShowLogin())
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={clsx('wrapper')}>
            <div onClick={handleShowPopup} className={clsx('close-btn-box', 'grid-center')}>
                <XIcon className={clsx('close-btn')} />
            </div>
            <h4 className={clsx('title')}>Log in to TikTok</h4>
            <div className={clsx('action-btns', 'd-flex')}>
                {loginFeatureBtns?.map((loginFeatureBtn) => (
                    <Button
                        key={loginFeatureBtn.id}
                        className={clsx('action-btn')}
                        title={loginFeatureBtn.title}
                        icon={loginFeatureBtn.icon}
                        onClick={() => {
                            handleLogin(loginFeatureBtn.onClick)
                        }}
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
