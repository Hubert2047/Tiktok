/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Button from '~/components/Button'
import { InboxIcon, MessengerIcon, ThreeDotIcon } from '~/components/Icons'
import Image from '~/components/Image'
import Menu from '~/components/Menu'
import { LoginPopup } from '~/components/Popper'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import Search from '~/components/Search'
import config from '~/config'
import { getUnReadMessages } from '~/firebase'
import { useMessageRoute } from '~/hooks'
import { LOGIN_MENU_ITEM, UNLOGIN_MENU_ITEM } from '~/staticData'
import Notifications from '../Notifications'
import styles from './Header.module.scss'
const clsx = classNames.bind(styles)

function Header({ className }) {
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()
    const [unReadMsg, setUnReadMsg] = useState(0)
    // const dispath = useDispatch()
    const currentUser = useSelector((state) => state.user.user)
    const handleShowLoginPopup = function () {
        setShowLogin((prev) => !prev)
    }
    const handleMessages = function () {
        navigate(useMessageRoute(currentUser))
    }
    useEffect(() => {
        getUnReadMessages(currentUser, (unReadMsgCount) => {
            setUnReadMsg(unReadMsgCount)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const UnLoginUI = function () {
        // console.log('logout')
        return (
            <Fragment>
                <Button
                    to='./'
                    type='btn-grey'
                    size='size-md'
                    icon={<IoMdAdd />}
                    title='Upload'
                    border='border-grey'></Button>

                <Button
                    onClick={handleShowLoginPopup}
                    to='./'
                    color='color-white'
                    bg='bg-primary'
                    size='size-md'
                    title='Log in'></Button>
                {showLogin && (
                    <FullScreenModal handleShowPopup={handleShowLoginPopup}>
                        <LoginPopup handleShowPopup={handleShowLoginPopup} />
                    </FullScreenModal>
                )}
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
                            <span className={clsx('inbox-notification')}>10</span>
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
                <Link to={config.routes.home} className={clsx('logo', 'd-flex')}>
                    <img src={images.logo} alt='logo' />
                </Link>
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
