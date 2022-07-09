import classNames from 'classnames/bind'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import Search from '~/components/Search'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import useOverflow from '../../../hooks/useOverflow'
import styles from './MobileSearch.module.scss'

const clsx = classNames.bind(styles)
function MobileSearch() {
    const dispath = useDispatch()
    useOverflow()
    const handleGoBack = function () {
        dispath(containerPortalActions.setComponent(null))
    }
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('header', 'd-flex')}>
                <AiOutlineArrowLeft onClick={handleGoBack} className={clsx('back-icon')} />
                <Search className={clsx('search')} resultClass={clsx('search-result')} />
            </div>
        </div>
    )
}

export default MobileSearch
