import classNames from 'classnames/bind'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import { PlayIcon } from '~/components/Icons'
import styles from './NotFoundPage.module.scss'
const clsx = classNames.bind(styles)
function NotFoundPage() {
    const navigate = useNavigate()
    const handleBackToHome = function () {
        navigate('/')
    }
    return (
        <div
            //     style={{ background: `url(${images.bgNotFount}) transparent center no-repeat;` }}
            className={clsx('wrapper', 'flex-center')}>
            <h4 className={clsx('title')}>404 Not Found Page</h4>
            <span>Couldn't find this page</span>
            <p className={clsx('desc')}>Check out more trending videos on TikTok</p>
            <Button
                onClick={handleBackToHome}
                className={clsx('btn')}
                icon={<PlayIcon />}
                title={clsx('Watch Now')}
                bg='bg-primary'
                color='color-white'
                size='size-big'
            />
        </div>
    )
}

export default NotFoundPage
