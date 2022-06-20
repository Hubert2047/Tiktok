import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BookMarkIcon, HeartIcon, MobileMessengerIcon, MobileShareIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { getCommentCount } from '~/firebase'
import { formatCountNumber } from '~/helper'
import { mobileHomeActions } from '~/redux/mobile/mobileHomeSlice'
import styles from './MobileSidebar.module.scss'
const clsx = classNames.bind(styles)
function MobileSidebar({ className, post }) {
    const dispath = useDispatch()
    const [commentCount, setCommentCount] = useState(0)
    useEffect(() => {
        getCommentCount(post.id, (result) => {
            setCommentCount(result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleCommentBtn = function () {
        dispath(
            mobileHomeActions.setPost({
                showCommentBox: true, //show comment box
                post: post,
            })
        )
    }
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('avatar-box')}>
                <Image className={clsx('avatar')} src={post?.user.avatar} />
                <div className={clsx('add-icon')}></div>
                {/* <MobileAddIcon className={clsx('add-icon')} /> */}
            </div>
            <div className={clsx('btn-box', 'd-flex')}>
                <HeartIcon className={clsx('heart-btn', 'btn')} />
                <span>{formatCountNumber(post?.likes)}</span>
            </div>
            <div onClick={handleCommentBtn} className={clsx('btn-box', 'd-flex')}>
                <MobileMessengerIcon className={clsx('comment-btn', 'btn')} />
                <span>{formatCountNumber(commentCount)}</span>
            </div>
            <div className={clsx('btn-box', 'd-flex')}>
                <BookMarkIcon className={clsx('bookmark-btn', 'btn')} />
                <span>{formatCountNumber(post?.bookmark)}</span>
            </div>
            <div className={clsx('btn-box', 'd-flex')}>
                <MobileShareIcon className={clsx('share-btn', 'btn')} />
                <span>{formatCountNumber(post?.shares)}</span>
            </div>
        </div>
    )
}

export default MobileSidebar
