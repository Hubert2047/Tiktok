import classNames from 'classnames/bind'
import React, { useEffect, useRef } from 'react'
import { SpinerBoxIcon } from '~/components/Icons'
import Image from '~/components/Image'
import styles from './MobileVideoFooter.module.scss'

const clsx = classNames.bind(styles)
function Spiner({ isplay, post, className }) {
    const spinerRef = useRef()
    const spinerAnimated = useRef()

    useEffect(() => {
        if (spinerRef.current) {
            spinerAnimated.current = spinerRef.current.animate(
                [
                    { transform: ' translate(-50%, -50%) rotate(0deg)' },
                    { transform: ' translate(-50%, -50%) rotate(360deg)' },
                ],
                {
                    duration: 5000,
                    iterations: Infinity,
                }
            )
            spinerAnimated.current.pause()
        }
    }, [])
    useEffect(() => {
        if (!spinerAnimated.current) return
        if (isplay) {
            spinerAnimated.current.play()
        } else {
            spinerAnimated.current.pause()
        }
    }, [isplay])
    return (
        <div className={clsx('wrraper', className)}>
            <div className={clsx('spiner-song', { 'song-animated': isplay })}></div>
            <div className={clsx('spiner-music', { 'song-animated': isplay })}></div>
            <SpinerBoxIcon className={clsx('spiner-box')} />
            <div ref={spinerRef} className={clsx('avatar-box')}>
                <Image className={clsx('avatar')} src={post?.user?.avatar} />
            </div>
        </div>
    )
}

export default Spiner
