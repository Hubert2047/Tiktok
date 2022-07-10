import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useState } from 'react'
import Button from '~/components/Button'
import MenuItem from '~/components/Menu/MenuItem'
import { PopperWrapper } from '~/components/Popper'
import { DownIcon } from '../Icons'
import styles from './MenuShare.module.scss'
const clsx = classNames.bind(styles)
function MenuShare({ menu = [], hideOnClick = false, placement = 'bottom-start', link, children }) {
    const [showAll, setShowAll] = useState(false)
    const handleMenuOnHide = function () {
        setShowAll(false)
    }
    const handleShowAllClick = function () {}

    const renderMenuContainer = function () {
        return (
            <div className={clsx('menu-list')}>
                <PopperWrapper className={clsx('menu-container')}>
                    <div className={clsx('menu-body')}>
                        {menu[0]?.data?.map((item, index) => {
                            return <MenuItem key={index} item={item} />
                        })}
                        {/* {menu.map((item) => {
                            const ShareBtn = item.icon
                            return <ShareBtn key={item.id} link={link} />
                        })} */}
                    </div>
                    {!showAll && menu[0]?.data?.length > 4 && (
                        <Button
                            className={clsx('show-all-btn')}
                            icon={<DownIcon width='1.8rem' height='1.8rem' />}
                            onClick={handleShowAllClick}
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

export default MenuShare
