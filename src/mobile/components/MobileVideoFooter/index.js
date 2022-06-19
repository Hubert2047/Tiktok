import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { SpinerBoxIcon } from '~/components/Icons'
import Image from '~/components/Image'
import styles from './MobileVideoFooter.module.scss'

const clsx = classNames.bind(styles)

function MobileVideoFooter({ className, post }) {
    const spinerAnimated = useRef()
    const spinerRef = useRef()
    const [reFlow, setReflow] = useState(false)
    const [showAllContent, setShowAllContent] = useState()
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
    const handleReflow = function (rleState) {
        if (rleState?.clamped) {
            setShowAllContent(false)
            setReflow(true)
        }
    }
    const handleShowContent = function () {
        setShowAllContent((prev) => !prev)
    }
    return (
        <div className={clsx('wrapper', 'd-flex', className)} onClick={handleClick}>
            <div className={clsx('footer-text')}>
                <h3 className={clsx('name')}>{`@${post.user.nickname}`}</h3>
                <div className={clsx('content-box')}>
                    {post?.content?.length > 0 && !showAllContent ? (
                        <LinesEllipsis
                            className={clsx('content')}
                            text={post.content}
                            maxLine={2}
                            basedOn='words'
                            onReflow={handleReflow}
                            ellipsis={'...'}></LinesEllipsis>
                    ) : (
                        <p className={clsx('content')}>{post.content}</p>
                    )}
                    {reFlow && (
                        <button onClick={handleShowContent} className={clsx('show-content')}>
                            See more
                        </button>
                    )}
                </div>
            </div>
            <div className={clsx('bottom', 'd-flex')}>
                <div className={clsx('title', 'd-flex')}>
                    <div className={clsx('music-icon')}></div>
                    <p>fafefaf</p>
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
        </div>
    )
}

export default MobileVideoFooter
