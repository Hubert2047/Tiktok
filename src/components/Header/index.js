import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'
import { Fragment } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Button from '~/components/Button'
import { InboxIcon, MessengerIcon, ThreeDotIcon } from '~/components/Icons'
import Image from '~/components/Image'
import Menu from '~/components/Menu'
import Search from '~/components/Search'
import config from '~/config'
import { LOGIN_MENU_ITEM, UNLOGIN_MENU_ITEM } from '~/staticData'
import styles from './Header.module.scss'
const clsx = classNames.bind(styles)

function Header() {
    const currentUser = true
    const unLoginUI = (
        <Fragment>
            <Button
                to='./'
                type='btn-grey'
                size='size-md'
                icon={<IoMdAdd />}
                title='Upload'
                border='border-grey'></Button>

            <Button to='./' type='btn-primary' size='size-md' title='Log in'></Button>
            <Menu menu={UNLOGIN_MENU_ITEM}>
                <ThreeDotIcon className={clsx('icon')} />
            </Menu>
        </Fragment>
    )
    const loginUI = (
        <Fragment>
            <Button
                to='./'
                type='btn-grey'
                size='size-md'
                border='border-grey'
                icon={<IoMdAdd />}
                title='Upload'></Button>
            <Tippy content='Message' delay={[0, 50]}>
                <button className={clsx('btn', 'd-flex')}>
                    <MessengerIcon />
                </button>
            </Tippy>
            <Tippy content='Inbox' delay={[0, 50]}>
                <button className={clsx('btn', 'd-flex')}>
                    <InboxIcon />
                    <span className={clsx('inbox-notification')}>10</span>
                </button>
            </Tippy>
            <Menu menu={LOGIN_MENU_ITEM}>
                <Image src={images.avatar} alt='avatar' className={clsx('avatar', 'd-flex')} />
            </Menu>
        </Fragment>
    )

    return (
        <header className={clsx('wrapper')}>
            <div className={clsx('inner', 'd-flex')}>
                {/* logo */}
                <Link to={config.routes.home} className={clsx('logo', 'd-flex')}>
                    <img src={images.logo} alt='logo' />
                </Link>
                {/* search */}
                <Search />
                {/* action */}
                <div className={clsx('right-container', 'd-flex')}>{currentUser ? loginUI : unLoginUI}</div>
            </div>
        </header>
    )
}

export default Header
