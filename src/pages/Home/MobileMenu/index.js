import classNames from 'classnames/bind'
import React from 'react'
import { useDispatch } from 'react-redux'
import { XIcon } from '~/components/Icons'
import Sidebar from '~/components/Sidebar'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import useOverflow from '../../../hooks/useOverflow'
import styles from './MobileMenu.module.scss'

const clsx = classNames.bind(styles)
function MobileMenu() {
    const dispath = useDispatch()
    const handleCloseMenu = function () {
        dispath(containerPortalActions.setComponent(null))
    }
    useOverflow()
    return (
        <div className={clsx('wrapper')}>
            <div onClick={handleCloseMenu} className={clsx('close-btn', 'flex-center')}>
                <XIcon className={clsx('close-icon')} />
            </div>
            <Sidebar className={clsx('menu')} />
        </div>
    )
}

export default MobileMenu
