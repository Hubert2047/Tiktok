import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { ForwardIcon } from '~/components/Icons'
import { GetAppPopup } from '~/components/Popper'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import styles from './GetApp.module.scss'
const clsx = classNames.bind(styles)
function GetApp({ className }) {
    const dispath = useDispatch()
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
    const handleUpToHeaderBtnOnClick = function () {
        wrapperRef.current.parentNode.scrollTo({ top: 0 })
        window.scrollTo({ top: 0 })
    }
    const handleShowPopup = function () {
        dispath(containerPortalActions.setComponent(<GetAppPopup />))
    }
    return (
        <div ref={wrapperRef} className={clsx('wrapper', className)}>
            <div className={clsx('app-btn', 'd-flex', { [showUpHeader]: showUpHeader })}>
                <Button
                    title='Get app'
                    type='btn-rounded'
                    size='size-sm'
                    border={'border-grey'}
                    className={clsx('get-app-btn')}
                    onClick={handleShowPopup}
                />

                <Button
                    onClick={handleUpToHeaderBtnOnClick}
                    icon={<ForwardIcon />}
                    color={'color-white'}
                    bg={'bg-primary'}
                    type={'btn-all-rounded'}
                    size='size-sm'
                    className={clsx('scroll-btn')}
                />
            </div>
        </div>
    )
}

export default GetApp
