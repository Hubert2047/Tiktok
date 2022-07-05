/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Button from '~/components/Button'
import { InboxIcon, MessengerIcon, ThreeDotIcon } from '~/components/Icons'
import Image from '~/components/Image'
import Menu from '~/components/Menu'
import Search from '~/components/Search'
import { getNotificationCount, getUnReadMessages } from '~/firebase'
import { useMessageRoute } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { LOGIN_MENU_ITEM, UNLOGIN_MENU_ITEM } from '~/staticData'
import Notifications from '../Notifications'
import { LoginPopup } from '../Popper'
import styles from './Header.module.scss'
const clsx = classNames.bind(styles)

function Header({ className }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [unReadMsg, setUnReadMsg] = useState(0)
    const [notificationCount, setNotificationCount] = useState(0)
    const currentUser = useSelector((state) => state.user.user)
    const handleShowLoginPopup = function () {
        dispath(containerPortalActions.setComponent({ component: <LoginPopup />, onClickOutside: true }))
    }
    const handleMessages = function () {
        navigate(useMessageRoute(currentUser))
    }
    useEffect(() => {
        getUnReadMessages(currentUser, (unReadMsgCount) => {
            setUnReadMsg(unReadMsgCount)
        })
        getNotificationCount(currentUser, (notificationCount) => {
            setNotificationCount(notificationCount)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleRouteToUpdateVideo = function () {
        setTimeout(() => {
            navigate('/upload')
        }, 0)
    }
    const handleBackHome = function () {
        navigate('/')
        window.scrollTo({ top: 0, behavior: 'smooth' }) //scroll to header so we can see video
    }
    const UnLoginUI = function () {
        // console.log('logout')
        return (
            <Fragment>
                <Button
                    onClick={handleShowLoginPopup}
                    to='./'
                    type='btn-grey'
                    size='size-md'
                    icon={<IoMdAdd />}
                    title='Upload'
                    className={clsx('upload-btn')}
                    border='border-grey'></Button>

                <Button
                    onClick={handleShowLoginPopup}
                    to='./'
                    color='color-white'
                    bg='bg-primary'
                    size='size-md'
                    title='Log in'></Button>
                <Menu menu={UNLOGIN_MENU_ITEM}>
                    <ThreeDotIcon className={clsx('icon')} />
                </Menu>
            </Fragment>
        )
    }

    const LoginUI = function () {
        // console.log('login')
        return (
            <Fragment>
                <Button
                    to='./'
                    type='btn-grey'
                    size='size-md'
                    border='border-grey'
                    icon={<IoMdAdd />}
                    className={clsx('upload-btn')}
                    onClick={handleRouteToUpdateVideo}
                    title='Upload'></Button>
                <Tippy content='Message' delay={[0, 50]}>
                    <button onClick={handleMessages} className={clsx('btn', 'd-flex')}>
                        <MessengerIcon />
                        {unReadMsg > 0 && <span className={clsx('inbox-messages')}>{unReadMsg}</span>}
                    </button>
                </Tippy>
                <Notifications>
                    <Tippy content='Inbox' delay={[0, 50]}>
                        <button className={clsx('btn', 'd-flex')}>
                            <InboxIcon />
                            {notificationCount > 0 && (
                                <span className={clsx('inbox-notification')}>{notificationCount}</span>
                            )}
                        </button>
                    </Tippy>
                </Notifications>
                <Menu menu={LOGIN_MENU_ITEM}>
                    <Image src={currentUser.avatar} alt='avatar' className={clsx('avatar', 'd-flex')} />
                </Menu>
            </Fragment>
        )
    }

    return (
        <header className={clsx('wrapper')}>
            <div className={clsx('inner', 'd-flex', className)}>
                {/* logo */}
                <div onClick={handleBackHome} className={clsx('logo', 'd-flex')}>
                    <img src={images.logo} alt='logo' />
                </div>
                {/* search */}
                <Search className={clsx('search')} />
                {/* action */}
                <div className={clsx('right-container', 'd-flex')}>
                    {currentUser?.uid ? <LoginUI /> : <UnLoginUI />}
                </div>
            </div>
        </header>
    )
}

export default Header
