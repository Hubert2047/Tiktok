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
import { InboxIcon, MessengerIcon, SearchIcon, ThreeDotIcon } from '~/components/Icons'
import Image from '~/components/Image'
import Menu from '~/components/Menu'
import Search from '~/components/Search'
import { getNotificationCount, getUnReadMessages } from '~/firebase'
import { useMessageRoute } from '~/hooks'
import MobileSearch from '~/mobile/components/MobileSearch'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { LOGIN_MENU_ITEM, UNLOGIN_MENU_ITEM } from '~/staticData'
import Notifications from '../Notifications'
import { LoginPopup } from '../Popper'
import ThemeMode from '../ThemeMode'
import styles from './Header.module.scss'
const clsx = classNames.bind(styles)

function Header({ className }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [unReadMsg, setUnReadMsg] = useState(0)
    const [notificationCount, setNotificationCount] = useState(0)
    const currentUser = useSelector((state) => state.user.user)
    const theme = useSelector((state) => state.theme.theme)
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
    }, [currentUser])
    const handleRouteToUpdateVideo = function () {
        setTimeout(() => {
            navigate('/upload')
        }, 0)
    }
    const handleBackHome = function () {
        navigate('/')
        window.scrollTo({ top: 0, behavior: 'smooth' }) //scroll to header so we can see video
    }
    const handleShowSearchInMobile = function () {
        console.log('run')
        dispath(containerPortalActions.setComponent({ component: <MobileSearch />, onClickOutside: true }))
    }
    const UnLoginUI = function () {
        // console.log('logout')
        return (
            <Fragment>
                <SearchIcon
                    className={clsx('search-mobile')}
                    onClick={handleShowSearchInMobile}
                    width='30px'
                    height='30px'
                />
                <Button
                    onClick={handleShowLoginPopup}
                    to='./'
                    type='btn-grey'
                    size='size-md'
                    icon={<IoMdAdd className={clsx('upload-icon')} />}
                    title='Upload'
                    className={clsx('upload-btn')}
                    border='border-grey'></Button>

                <Button
                    onClick={handleShowLoginPopup}
                    to='./'
                    color='color-white'
                    bg='bg-primary'
                    size='size-md'
                    className={clsx('login-btn')}
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
                <SearchIcon
                    className={clsx('search-mobile')}
                    onClick={handleShowSearchInMobile}
                    width='30px'
                    height='30px'
                />
                <Button
                    to='./'
                    type='btn-grey'
                    size='size-md'
                    border='border-grey'
                    icon={<IoMdAdd className={clsx('upload-icon')} />}
                    className={clsx('upload-btn')}
                    onClick={handleRouteToUpdateVideo}
                    title='Upload'></Button>
                <Tippy content='Message' delay={[0, 50]}>
                    <button onClick={handleMessages} className={clsx('btn', 'd-flex')}>
                        <MessengerIcon className={clsx('message-icon')} />
                        {unReadMsg > 0 && <span className={clsx('inbox-messages')}>{unReadMsg}</span>}
                    </button>
                </Tippy>
                <Notifications>
                    {/* <Tippy content='Inbox' delay={[0, 50]}> */}
                    <button className={clsx('btn', 'd-flex')}>
                        <InboxIcon className={clsx('inbox-icon')} />
                        {notificationCount > 0 && (
                            <span className={clsx('inbox-notification')}>{notificationCount}</span>
                        )}
                    </button>
                    {/* </Tippy> */}
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
                    {theme.name === 'light' ? (
                        <img src={images.logo} alt='logo' />
                    ) : (
                        <h1 className={clsx('text-logo')}>TikTok</h1>
                    )}
                </div>
                {/* search */}
                <Search className={clsx('search')} />
                {/* action */}
                <ThemeMode className={clsx('theme-mode')} />
                <div className={clsx('right-container', 'd-flex')}>
                    {currentUser?.uid ? <LoginUI /> : <UnLoginUI />}
                </div>
            </div>
        </header>
    )
}

export default Header
