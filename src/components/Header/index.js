import Tippy from '@tippyjs/react'
import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment } from 'react'
import { BiDotsVerticalRounded, BiMessageAltMinus } from 'react-icons/bi'
import { BsKeyboard, BsSearch } from 'react-icons/bs'
import { CgProfile, CgLogOut } from 'react-icons/cg'
import { IoIosCloseCircleOutline, IoIosHelpCircleOutline, IoMdAdd } from 'react-icons/io'
import { IoPaperPlaneSharp } from 'react-icons/io5'
import { RiCharacterRecognitionFill, RiLoader2Line, RiSettings5Line } from 'react-icons/ri'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Button from '~/components/Button'
import Menu from '~/components/Menu'
import { PopperWrapper } from '~/components/Popper'
import UserSuggest from '~/components/UserSuggest'
import styles from './Header.module.scss'

const clsx = classNames.bind(styles)
const UNLOGIN_MENU_ITEM = [
    {
        data: [
            {
                title: 'English',
                icon: <RiCharacterRecognitionFill />,
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
            { title: 'Feedback and help', icon: <IoIosHelpCircleOutline />, to: './' },
            { title: 'Keyboard shortcuts', icon: <BsKeyboard /> },
        ],
    },
]
const LOGIN_MENU_ITEM = [
    {
        data: [
            { title: 'View profile', icon: <CgProfile />, to: './' },
            { title: 'Setting', icon: <RiSettings5Line />, to: './' },
            ...UNLOGIN_MENU_ITEM[0].data,
            { title: 'Log out', icon: <CgLogOut />, to: './', separate: true },
        ],
    },
]
function Header() {
    const [searchResults, setSearchResults] = [1]
    const currentUser = true
    const unLoginUI = (
        <Fragment>
            <Button to='./' type='btn-grey' size='size-md' icon={<IoMdAdd />} title='Upload'></Button>
            <Button to='./' type='btn-primary' size='size-md' title='Log in'></Button>
            <Menu menu={UNLOGIN_MENU_ITEM}>
                <BiDotsVerticalRounded className={clsx('icon')} />
            </Menu>
        </Fragment>
    )
    const loginUI = (
        <Fragment>
            <Button to='./' type='btn-grey' size='size-md' icon={<IoMdAdd />} title='Upload'></Button>
            <Tippy content='Message' delay={[0, 50]} trigger='click'>
                <button className={clsx('btn', 'd-flex')}>
                    <IoPaperPlaneSharp className={clsx('icon')} />
                </button>
            </Tippy>
            <Tippy content='Inbox' delay={[0, 50]}>
                <button className={clsx('btn', 'd-flex')}>
                    <BiMessageAltMinus className={clsx('icon')} />
                </button>
            </Tippy>
            <Menu menu={LOGIN_MENU_ITEM}>
                <img src={images.avatar} alt='avatar' className={clsx('avatar')} />
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
                            <BsSearch className={clsx('search-icon')} />
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
