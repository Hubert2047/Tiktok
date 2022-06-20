import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { SpinerBoxIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { convertTimeStampToDate } from '~/helper'
import styles from './MobileVideoFooter.module.scss'

const clsx = classNames.bind(styles)

function MobileVideoFooter({ className, post, play }) {
    const spinerAnimated = useRef()
    const sloganAnimated = useRef()
    const spinerRef = useRef()
    const sloganRef = useRef()
    const [reFlow, setReflow] = useState(false)
    const [showAllContent, setShowAllContent] = useState()
    useEffect(() => {
        if (!spinerAnimated.current) return
        if (play) {
            spinerAnimated.current.play()
            sloganAnimated.current.play()
        } else {
            spinerAnimated.current.pause()
            sloganAnimated.current.pause()
        }
    }, [play])
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
        if (sloganRef.current) {
            sloganAnimated.current = sloganRef.current.animate(
                [{ transform: ' translateX(100%)' }, { transform: 'translateX(-100%)' }],
                {
                    duration: 5000,
                    iterations: Infinity,
                }
            )
            sloganAnimated.current.pause()
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
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('footer-text')}>
                <h3 className={clsx('name', 'd-flex')}>
                    <span className={clsx('tag')}>@</span>
                    <p>{`${post.user.nickname}`}</p>
                    <span className={clsx('dot')}>。</span>
                    <span className={clsx('created-at')}>{convertTimeStampToDate(post.createdAt)}</span>
                </h3>
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
                    <div className={clsx('slogan-box')}>
                        <p ref={sloganRef} className={clsx('slogan')}>
                            Woops! You guys be happy with coding !
                        </p>
                    </div>
                </div>
                <div className={clsx('spiner-container')}>
                    <div className={clsx('spiner-song', { 'song-animated': play })}></div>
                    <div className={clsx('spiner-music', { 'song-animated': play })}></div>
                    <SpinerBoxIcon className={clsx('spiner-box')} />
                    <div ref={spinerRef} className={clsx('avatar-box')}>
                        <Image className={clsx('avatar')} src={post?.user.avatar} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileVideoFooter
