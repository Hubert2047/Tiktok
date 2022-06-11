import classNames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'
import Button from '~/components/Button'
import { ForwardIcon } from '~/components/Icons'
import styles from './GetApp.module.scss'
const clsx = classNames.bind(styles)
function GetApp({ parentRef }) {
    const wrapperRef = useRef(null)
    const [showUpHeader, setShowUpHeader] = useState('')
    useEffect(() => {
        const handleScroll = function () {
            if (wrapperRef.current.parentNode.scrollTop === 0) {
                setShowUpHeader('')
            } else {
                setShowUpHeader(clsx('show-btn'))
            }
        }
        wrapperRef.current.parentNode.addEventListener('scroll', handleScroll)
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            // wrapperRef.current.parentNode.removeEventListener('scroll', handleScroll)
        }
    })
    const handleUpHeaderOnClick = function () {
        wrapperRef.current.parentNode.scrollTo(0, 0)
    }
    return (
        <div ref={wrapperRef} className={clsx('wrapper', 'd-flex', { [showUpHeader]: showUpHeader })}>
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
