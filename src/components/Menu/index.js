/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import MenuItem from '~/components/Menu/MenuItem'
import { PopperWrapper } from '~/components/Popper'
import { logOut } from '~/firebase'
import { useProfileRoute } from '~/hooks'
import { userActions } from '~/redux/userSlice'
import { LOG_OUT, VIEW_PROFILE } from '~/staticData'
import { DownIcon } from '../Icons'
import styles from './Menu.module.scss'
import MenuHeader from './MenuHeader'
const clsx = classNames.bind(styles)
function Menu({ menu = [], hideOnClick = false, children, placement = 'bottom-end', link }) {
    const dispath = useDispatch()
    const currentUser = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    const [menuList, setMenuList] = useState(menu)
    const [showAll, setShowAll] = useState(false)
    let currentMenu = menuList[menuList?.length - 1]
    if (!showAll) currentMenu = { ...currentMenu, data: currentMenu.data.slice(0, 5) }
    const handleMenuItemOnclick = function (item) {
        // console.log(item)
        //when it has children we render it
        if (item.children) {
            setMenuList((prev) => [...prev, item.children])
        } else {
            //handle when it doesnt have childrent
            switch (item.type) {
                case LOG_OUT:
                    logOut(() => {
                        dispath(userActions.setUser({}))
                        navigate('/')
                    })
                    break
                case VIEW_PROFILE:
                    setTimeout(() => {
                        navigate(useProfileRoute(currentUser))
                    }, 0)
                    break
                default:
                    return
            }
        }
    }
    const handleMenuOnBack = function () {
        setMenuList((prev) => {
            return prev.slice(0, -1)
        })
    }
    const handleMenuOnHide = function () {
        setMenuList((prev) => {
            return prev.slice(0, 1) //return back to first array
        })
        setShowAll(false)
    }
    const handleShowAllItem = function () {
        setShowAll(true)
    }
    const renderMenu = () => {
        return currentMenu?.data.map((item, index) => {
            return <MenuItem key={index} item={item} onMenuItemClick={handleMenuItemOnclick} />
        })
    }
    const renderMenuContainer = function () {
        return (
            <div className={clsx('menu-list')} tabIndex='-1'>
                <PopperWrapper className={clsx('menu-container')}>
                    {/* menu header */}
                    {menuList.length > 1 && <MenuHeader title={currentMenu.title} onBack={handleMenuOnBack} />}
                    {/* render item */}
                    <div className={clsx('menu-body')}> {renderMenu()}</div>
                    {/* show all buttom */}
                    {!showAll && currentMenu.data.length > 4 && (
                        <Button
                            className={clsx('show-all-btn')}
                            icon={<DownIcon width='1.8rem' height='1.8rem' />}
                            onClick={handleShowAllItem}
                        />
                    )}
                </PopperWrapper>
            </div>
        )
    }
    return (
        <div className={clsx('wrapper')}>
            <Tippy
                delay={[0, 300]} //delay to fade out
                offset={[7, 11]} //change position
                // trigger='click'
                // animation={true}
                // visible={true}
                hideOnClick={hideOnClick}
                interactive={true}
                placement={placement}
                render={renderMenuContainer}
                onHide={handleMenuOnHide}>
                <div>{children}</div>
            </Tippy>
        </div>
    )
}

export default Menu
