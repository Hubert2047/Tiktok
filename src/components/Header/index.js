import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'
import { Fragment } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Button from '~/components/Button'
import Menu from '~/components/Menu'
import config from '~/config'
import {
    HelpIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    MessengerIcon,
    ProfileIcon,
    SettingIcon,
    ThreeDotIcon,
} from '../Icons'
import Image from '../Image'
import Search from '../Search'
import styles from './Header.module.scss'

const clsx = classNames.bind(styles)
const UNLOGIN_MENU_ITEM = [
    {
        data: [
            {
                title: 'English',
                icon: <LanguageIcon />,
                children: {
                    title: 'languages',
                    data: [
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                    ],
                },
            },
            { title: 'Feedback and help', icon: <HelpIcon />, to: './' },
            { title: 'Keyboard shortcuts', icon: <KeyboardIcon /> },
        ],
    },
]
const LOGIN_MENU_ITEM = [
    {
        data: [
            { title: 'View profile', icon: <ProfileIcon />, to: './' },
            { title: 'Setting', icon: <SettingIcon />, to: './' },
            ...UNLOGIN_MENU_ITEM[0].data, //clone data from unlogin menu
            { title: 'Log out', icon: <LogoutIcon />, to: './', separate: true },
        ],
    },
]
function Header() {
    const currentUser = true
    const unLoginUI = (
        <Fragment>
            <Button to='./' type='btn-grey' size='size-md' icon={<IoMdAdd />} title='Upload'></Button>
            <Button to='./' type='btn-primary' size='size-md' title='Log in'></Button>
            <Menu menu={UNLOGIN_MENU_ITEM}>
                <ThreeDotIcon className={clsx('icon')} />
            </Menu>
        </Fragment>
    )
    const loginUI = (
        <Fragment>
            <Button to='./' type='btn-grey' size='size-md' icon={<IoMdAdd />} title='Upload'></Button>
            <Tippy content='Message' delay={[0, 50]}>
                <button className={clsx('btn', 'd-flex')}>
                    <MessengerIcon />
                </button>
            </Tippy>
            <Tippy content='Inbox' delay={[0, 50]}>
                <button className={clsx('btn', 'd-flex')}>
                    <InboxIcon />
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
                {/* headless of Tippy */}
                <Search />
                {/* action */}
                <div className={clsx('right-container', 'd-flex')}>{currentUser ? loginUI : unLoginUI}</div>
            </div>
        </header>
    )
}

export default Header
