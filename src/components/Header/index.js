import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsKeyboard, BsSearch } from 'react-icons/bs'
import { IoIosCloseCircleOutline, IoIosHelpCircleOutline, IoMdAdd } from 'react-icons/io'
import { RiCharacterRecognitionFill, RiLoader2Line } from 'react-icons/ri'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Button from '~/components/Button'
import Menu from '~/components/Menu'
import { PopperWrapper } from '~/components/Popper'
import UserSuggest from '~/components/UserSuggest'
import styles from './Header.module.scss'

const clsx = classNames.bind(styles)
const MENU_ITEM = [
    { title: 'English', icon: <RiCharacterRecognitionFill /> },
    { title: 'Feedback and help', icon: <IoIosHelpCircleOutline /> },
    { title: 'Keyboard shortcuts', icon: <BsKeyboard /> },
]
function Header() {
    const [searchResults, setSearchResults] = [1]
    const user = {
        id: 1,
        img: '',
        title: '',
        desc: '',
    }
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('inner', 'd-flex')}>
                {/* logo */}
                <div className={clsx('logo')}>
                    <img src={images.logo} alt='logo' />
                </div>
                {/* search */}
                {/* headless of Tippy */}
                <Tippy
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
                </Tippy>
                {/* action */}
                <div className={clsx('right-container', 'd-flex')}>
                    <Button to='./' type='btn-grey' size='size-md' icon={<IoMdAdd />} title='Upload'></Button>
                    <Button to='./' type='btn-primary' size='size-md' title='Log in'></Button>
                    <Menu menu={MENU_ITEM}>
                        <BiDotsVerticalRounded className={clsx('seemore-icon')} />
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Header
