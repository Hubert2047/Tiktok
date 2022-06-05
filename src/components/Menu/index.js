import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useState } from 'react'
import MenuItem from '~/components/Menu/MenuItem'
import { PopperWrapper } from '~/components/Popper'
import styles from './Menu.module.scss'
import MenuHeader from './MenuHeader'
const clsx = classNames.bind(styles)
function Menu({ children, menu = [] }) {
    const [menuList, setMenuList] = useState(menu)
    const currentMenu = menuList.at(-1)

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
            return prev.slice(0, 1)
        })
    }
    const renderMenu = () => {
        return currentMenu?.data.map((item, index) => {
            return <MenuItem key={index} item={item} onMenuItemClick={handleMenuItemOnclick} />
        })
    }
    return (
        <div className={clsx('wrapper')}>
            <Tippy
                delay={[0, 300]}
                offset={[7, 11]}
                // trigger='click'
                // animation={true}
                // visible={true}
                interactive={true}
                placement='bottom-end'
                render={(attrs) => (
                    <div className={clsx('menu-list')} tabIndex='-1' {...attrs}>
                        <PopperWrapper className={clsx('menu-container')}>
                            {menuList.length > 1 && <MenuHeader title={currentMenu.title} onBack={handleMenuOnBack} />}
                            {renderMenu()}
                        </PopperWrapper>
                    </div>
                )}
                onHide={handleMenuOnHide}>
                <div>{children}</div>
            </Tippy>
        </div>
    )
}

export default Menu
