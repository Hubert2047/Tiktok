import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import { SpinerBoxIcon } from '~/components/Icons'
import Image from '~/components/Image'
import styles from './MobileVideoFooter.module.scss'

const clsx = classNames.bind(styles)

function MobileVideoFooter({ className, post }) {
    const spinerAnimated = useRef()
    const spinerRef = useRef()
    const handleClick = () => {
        if (spinerAnimated.current) {
            spinerAnimated.current.play()
        }
    }
    useEffect(() => {
        if (spinerRef.current) {
            const _spiner = spinerRef.current.animate(
                [
                    { transform: ' translate(-50%, -50%) rotate(0deg)' },
                    { transform: ' translate(-50%, -50%) rotate(360deg)' },
                ],
                {
                    duration: 5000,
                    iterations: Infinity,
                }
            )
            _spiner.pause()
            spinerAnimated.current = _spiner
        }
    }, [])

    return (
        <div className={clsx('wrapper', 'd-flex', className)} onClick={handleClick}>
            <div className={clsx('footer-text')}>
                <h3 className={clsx('title')}>{`@${post.user.nickname}`}</h3>
                <div className={clsx('content-container', 'd-flex')}>
                    <div className={clsx('music-icon')}></div>
                    <div className={clsx('content-box')}>
                        <h4 className={clsx('content')}>{post.content}</h4>
                    </div>
                </div>
            </div>
            <div className={clsx('spiner-container')}>
                <div className={clsx('spiner-song')}></div>
                <div className={clsx('spiner-music')}></div>
                <SpinerBoxIcon className={clsx('spiner-box')} />
                <div ref={spinerRef} className={clsx('avatar-box')}>
                    <Image
                        className={clsx('avatar')}
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWrIiYIAdOLTJ5Ql5YtMUvL3y3kK0Vh5JXQ&usqp=CAU'
                    />
                </div>
            </div>
        </div>
    )
}

export default MobileVideoFooter
