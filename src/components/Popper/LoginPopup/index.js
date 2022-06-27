import classNames from 'classnames/bind'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { XIcon } from '~/components/Icons'
import Loading from '~/components/Loading'
import { addUser, getUser } from '~/firebase'
import { userActions } from '~/redux/userSlice'
import { loginFeatureBtns } from '~/staticData'
import FullScreenModal from '../FullScreenModal'
import styles from './LoginPopup.module.scss'
const clsx = classNames.bind(styles)
function LoginPopup({ handleShowPopup }) {
    const dispath = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleLogin = async function (handleLoginFeature) {
        // console.log(handleLoginFeature)
        try {
            setLoading(true)
            const data = await handleLoginFeature()
            // console.log('user', data)
            let user = await getUser(data.uid)
            if (!user) {
                user = {
                    full_name: data.displayName,
                    avatar: data.photoURL,
                    uid: data.uid,
                    nickname: data?.nickname || '',
                    desc: data?.desc || '',
                    isLive: data?.isLive || '',
                }
                await addUser(user)
            }

            dispath(userActions.setUser(user))
            handleShowPopup()
            setLoading(false)
        } catch (err) {
            console.log(err)
            handleShowPopup()
            setLoading(false)
        }
    }
    return (
        <div className={clsx('wrapper')}>
            <div onClick={handleShowPopup} className={clsx('close-btn-box', 'flex-center')}>
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
            {loading && (
                <FullScreenModal>
                    <Loading />
                </FullScreenModal>
            )}
        </div>
    )
}

export default LoginPopup
