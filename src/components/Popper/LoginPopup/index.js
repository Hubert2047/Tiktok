import classNames from 'classnames/bind'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import Comfirm from '~/components/Comfirm'
import { XIcon } from '~/components/Icons'
import Loading from '~/components/Loading'
import { addUser, isExistUser } from '~/firebase'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { toastActions } from '~/redux/toastSlice'
import { userActions } from '~/redux/userSlice'
import { loginFeatureBtns } from '~/staticData'
import useOverflow from '../../../hooks/useOverflow'
import styles from './LoginPopup.module.scss'
const clsx = classNames.bind(styles)
function LoginPopup() {
    useOverflow()
    const dispath = useDispatch()
    const [deviceWidth] = useState(() => {
        return document.documentElement.clientWidth
    })
    const handleLogin = async function (handleLoginFeature, type = '') {
        //check if do not implement function feature
        if (typeof handleLoginFeature !== 'function') {
            dispath(
                toastActions.addToast({
                    message:
                        'This feature will be comming soon. Please login with google or take a look with admin account',
                    mode: 'success',
                })
            )
            return
        }

        // running login if already implement function feature
        try {
            dispath(containerPortalActions.setComponent({ component: <Loading />, onClickOutside: true }))

            const data = await handleLoginFeature()
            let checkUser = await isExistUser(data.uid)
            if (!checkUser) {
                const user = {
                    full_name: data.displayName,
                    avatar: data.photoURL,
                    followers: 0,
                    followings: 0,
                    like: [],
                    uid: data.uid,
                    nickname: data?.nickname || '',
                    desc: data?.desc || '',
                    isLive: data?.isLive || '',
                }
                await addUser(user)
            }
            dispath(userActions.setCurrentUserId(data.uid))

            closePopup()
            dispath(containerPortalActions.setComponent(null))
        } catch (err) {
            if (type === 'google' && deviceWidth < 425) {
                dispath(
                    containerPortalActions.setComponent({
                        component: (
                            <Comfirm
                                question='Look like You are logging with a mobile device. So you have to login to google first and then log back in, or login with others feauture.'
                                subMitTitle='Ok !'
                                onSubmit={() => {
                                    dispath(containerPortalActions.setComponent(null))
                                }}
                            />
                        ),
                        onClickOutside: true,
                    })
                )
                return
            }
            closePopup()
            dispath(containerPortalActions.setComponent(null))
        }
    }
    const closePopup = () => {
        dispath(containerPortalActions.setComponent(null))
    }
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <div onClick={closePopup} className={clsx('close-btn-box', 'flex-center')}>
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
                            handleLogin(loginFeatureBtn.onClick, loginFeatureBtn.type)
                        }}
                    />
                ))}
            </div>
            <div className={clsx('bottom', 'd-flex')}>
                <p>Don’t have an account?</p>
                <Button title='Sign up' className={clsx('sign-up-btn')} />
            </div>
        </div>
    )
}

export default LoginPopup
