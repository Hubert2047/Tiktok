import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useState } from 'react'
import Button from '~/components/Button'
import MenuItem from '~/components/Menu/MenuItem'
import { PopperWrapper } from '~/components/Popper'
import { DownIcon } from '../Icons'
import styles from './Menu.module.scss'
import MenuHeader from './MenuHeader'
const clsx = classNames.bind(styles)
function Menu({ menu = [], hideOnClick = false, children }) {
    const [menuList, setMenuList] = useState(menu)
    const [showAll, setShowAll] = useState(false)
    let currentMenu = menuList.at(-1)
    if (!showAll) currentMenu = { ...currentMenu, data: currentMenu.data.slice(0, 5) }
    const handleMenuItemOnclick = function (item) {
        //when it has children we render it
        if (item.children) {
            setMenuList((prev) => [...prev, item.children])
        } else {
            //handle when it doesnt have childrent
            console.log(item)
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
    const handleShowAllClick = function () {
        setShowAll(true)
    }
    const renderMenu = () => {
        return currentMenu?.data.map((item, index) => {
            return <MenuItem key={index} item={item} onMenuItemClick={handleMenuItemOnclick} />
        })
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
                placement='bottom-end'
                render={(attrs) => (
                    <div className={clsx('menu-list')} tabIndex='-1' {...attrs}>
                        <PopperWrapper className={clsx('menu-container')}>
                            {menuList.length > 1 && <MenuHeader title={currentMenu.title} onBack={handleMenuOnBack} />}

                            <div className={clsx('menu-body')}> {renderMenu()}</div>
                            {!showAll && currentMenu.data.length > 4 && (
                                <Button
                                    className={clsx('show-all-btn')}
                                    icon={<DownIcon width='1.8rem' height='1.8rem' />}
                                    onClick={handleShowAllClick}
                                />
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onHide={handleMenuOnHide}>
                {children}
            </Tippy>
        </div>
    )
}

export default Menu
