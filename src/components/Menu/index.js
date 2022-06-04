import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import MenuItem from '~/components/MenuItem'
import { PopperWrapper } from '~/components/Popper'
import styles from './Menu.module.scss'
const clsx = classNames.bind(styles)
function Menu({ children, menu }) {
    const renderMenu = () => {
        return menu.map?.((item, index) => {
            return <MenuItem key={index} item={item} />
        })
    }
    return (
        <div className={clsx('wrapper')}>
            <Tippy
                delay={[0, 400]}
                // animation={true}
                interactive={true}
                placement='bottom-end'
                render={(attrs) => (
                    <div className={clsx('menu-list')} tabIndex='-1' {...attrs}>
                        <PopperWrapper className={clsx('menu-container')}>{renderMenu()}</PopperWrapper>
                    </div>
                )}>
                <div>{children}</div>
            </Tippy>
        </div>
    )
}

export default Menu
