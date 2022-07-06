import classNames from 'classnames/bind'
import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { PlayIcon } from '~/components/Icons'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import styles from './VideoNotFound.module.scss'
const clsx = classNames.bind(styles)
function VideoNotFound() {
    const dispath = useDispatch()
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <p className={clsx('title')}>This post may have been deleted by the author</p>
            <p className={clsx('desc')}>Check out more trending videos on TikTok</p>
            <Button
                icon={<PlayIcon />}
                onClick={() => {
                    dispath(containerPortalActions.setComponent(null))
                    window.history.back()
                }}
                title='Watch Now'
                size='size-big'
                bg='bg-primary'
                color='color-white'
                className={clsx('back-home-btn')}
            />
        </div>
    )
}

export default VideoNotFound
