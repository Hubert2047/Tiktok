import classNames from 'classnames/bind'
import React from 'react'
import FooterMobile from '../MobileFooter'
// import MobileSidebar from '../MobileSidebar'
import MobileVideo from '../MobileVideo'
import styles from './MobileApp.module.scss'

const clsx = classNames.bind(styles)
function MobileApp({ className }) {
    return (
        <div className={clsx(className, 'wrapper')}>
            <MobileVideo />
            <FooterMobile />

            {/* <MobileSidebar /> */}
        </div>
    )
}

export default MobileApp
