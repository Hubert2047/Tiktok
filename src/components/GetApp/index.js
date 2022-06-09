import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import { ForwardIcon } from '~/components/Icons'
import styles from './GetApp.module.scss'
const clsx = classNames.bind(styles)
function GetApp() {
    const [showUpHeader, setShowUpHeader] = useState('')
    useEffect(() => {
        const handleScroll = function () {
            if (window.scrollY === 0) {
                setShowUpHeader('')
            } else {
                setShowUpHeader(clsx('show-btn'))
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
    const handleUpHeaderOnClick = function () {
        window.scrollTo(0, 0)
    }
    return (
        <div className={clsx('wrapper', 'd-flex', { [showUpHeader]: showUpHeader })}>
            <Button
                title='Get app'
                type='btn-rounded'
                size='size-sm'
                border={'border-grey'}
                className={clsx('get-app-btn')}
            />

            <Button
                onClick={handleUpHeaderOnClick}
                icon={<ForwardIcon />}
                color={'color-white'}
                bg={'bg-primary'}
                type={'btn-all-rounded'}
                size='size-sm'
                className={clsx('scroll-btn')}
            />
        </div>
    )
}

export default GetApp
