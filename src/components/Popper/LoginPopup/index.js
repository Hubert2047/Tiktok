import classNames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { XIcon } from '~/components/Icons'
import Loading from '~/components/Loading'
import { addUser, isExistUser } from '~/firebase'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { userActions } from '~/redux/userSlice'
import { loginFeatureBtns } from '~/staticData'
import styles from './LoginPopup.module.scss'
const clsx = classNames.bind(styles)
function LoginPopup() {
    const dispath = useDispatch()
    const handleLogin = async function (handleLoginFeature) {
        // console.log(handleLoginFeature)
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
            console.log(err)
            closePopup()
            dispath(containerPortalActions.setComponent(null))
        }
    }
    const closePopup = () => {
        dispath(containerPortalActions.setComponent(null))
    }
    return (
        <div className={clsx('wrapper')}>
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
