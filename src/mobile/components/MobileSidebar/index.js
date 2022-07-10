import classNames from 'classnames/bind'
import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BookMarkIcon, HeartIcon, HeartPrimary, MobileMessengerIcon, MobileShareIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { formatCountNumber } from '~/helper'
import { toastActions } from '~/redux/toastSlice'
import styles from './MobileSidebar.module.scss'
const clsx = classNames.bind(styles)
function MobileSidebar({
    post,
    commentCount,
    handleWatchComment,
    handleLikePostAction,
    isLikedPost,
    setPosts,
    className,
}) {
    const [isAddToFavorite, setIsAddToFavorite] = useState(false)
    const dispath = useDispatch()
    const handleShare = function (e) {
        e.stopPropagation()
        dispath(toastActions.addToast({ message: 'This feature will be comming soon', mode: 'success' }))
    }
    const handleBookmark = function (e) {
        e.stopPropagation()
        //fake UI
        setPosts((prev) => {
            return prev.map((item) => {
                if (item.id === post.id) {
                    console.log(item.bookmark)
                    if (isAddToFavorite) {
                        return { ...item, bookmark: (item?.bookmark || 0) - 1 }
                    } else {
                        return { ...item, bookmark: (item?.bookmark || 0) + 1 }
                    }
                }
                return item
            })
        })
        if (!isAddToFavorite) dispath(toastActions.addToast({ message: 'Add to favorites', mode: 'success' }))
        setIsAddToFavorite((prev) => !prev)
    }
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('avatar-box')}>
                <Image className={clsx('avatar')} src={post?.postUser.avatar} />
                <div className={clsx('add-icon')}></div>
                {/* <MobileAddIcon className={clsx('add-icon')} /> */}
            </div>
            <div onClick={handleLikePostAction} className={clsx('btn-box', 'd-flex')}>
                <div>
                    {isLikedPost ? (
                        <HeartPrimary className={clsx('heart-primary')} />
                    ) : (
                        <HeartIcon className={clsx('heart-btn', 'btn')} />
                    )}
                </div>
                <span>{formatCountNumber(post?.likes)}</span>
            </div>
            <div onClick={handleWatchComment} className={clsx('btn-box', 'd-flex')}>
                <MobileMessengerIcon className={clsx('comment-btn', 'btn')} />
                <span>{formatCountNumber(commentCount)}</span>
            </div>
            <div onClick={handleBookmark} className={clsx('btn-box', 'd-flex')}>
                <BookMarkIcon className={clsx('bookmark-btn', 'btn', { 'add-favorite': isAddToFavorite })} />
                <span>{formatCountNumber(post?.bookmark)}</span>
            </div>
            <div onClick={handleShare} className={clsx('btn-box', 'd-flex')}>
                <MobileShareIcon className={clsx('share-btn', 'btn')} />
                <span>{formatCountNumber(post?.shares)}</span>
            </div>
        </div>
    )
}

export default memo(MobileSidebar)
