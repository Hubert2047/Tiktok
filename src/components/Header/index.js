import Tippy from '@tippyjs/react'
import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment } from 'react'
import { IoIosCloseCircleOutline, IoMdAdd } from 'react-icons/io'
import { RiLoader2Line } from 'react-icons/ri'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Button from '~/components/Button'
import Menu from '~/components/Menu'
import { PopperWrapper } from '~/components/Popper'
import UserSuggest from '~/components/UserSuggest'
import {
    HelpIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    MessengerIcon,
    ProfileIcon,
    SearchIcon,
    SettingIcon,
    ThreeDotIcon,
} from '../Icons'
import Image from '../Image'
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
            ...UNLOGIN_MENU_ITEM[0].data,
            { title: 'Log out', icon: <LogoutIcon />, to: './', separate: true },
        ],
    },
]
function Header() {
    const [searchResults, setSearchResults] = [1]
    const currentUser = false
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
    const user = {
        id: 1,
        img: '',
        title: '',
        desc: '',
    }
    return (
        <header className={clsx('wrapper')}>
            <div className={clsx('inner', 'd-flex')}>
                {/* logo */}
                <div className={clsx('logo')}>
                    <img src={images.logo} alt='logo' />
                </div>
                {/* search */}
                {/* headless of Tippy */}
                <HeadlessTippy
                    interactive={true}
                    render={(attrs) => (
                        <div className={clsx('search-result')} tabIndex='-1' {...attrs}>
                            <PopperWrapper>
                                <h4 className={clsx('search-title')}>Accounts</h4>
                                <UserSuggest user={user} />
                                {/* {searchResults.map?.((user) => {
                                    console.log(user)
                                    return <UserSuggest key={user.id} user={user} />
                                })} */}
                            </PopperWrapper>
                        </div>
                    )}>
                    <div className={clsx('center-container', 'd-flex')}>
                        <div className={clsx('search', 'd-flex')}>
                            <input placeholder='Search accounts and videos' />
                            <button className={clsx('clear', 'd-flex')}>
                                <IoIosCloseCircleOutline className={clsx('clear-icon')} />
                            </button>
                            <RiLoader2Line className={clsx('load')} />
                        </div>
                        <button className={clsx('search-btn', 'd-flex')}>
                            <SearchIcon />
                            {/* <BsSearch className={clsx('search-icon')} /> */}
                        </button>
                    </div>
                </HeadlessTippy>
                {/* action */}
                <div className={clsx('right-container', 'd-flex')}>{currentUser ? loginUI : unLoginUI}</div>
            </div>
        </header>
    )
}

export default Header
