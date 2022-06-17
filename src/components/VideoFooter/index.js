/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CommentIcon, HeartIcon, HeartPrimary, ShareIcon } from '~/components/Icons'
import Menu from '~/components/Menu'
import { LoginPopup } from '~/components/Popper'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import { getCommentCount, updatePostLike, updateUserLikes } from '~/firebase'
import { formatCountNumber } from '~/helper'
import { useVideoPageRoute } from '~/hooks'
import { shareItems } from '~/staticData'
import styles from './VideoFooter.module.scss'

const clsx = classNames.bind(styles)
function VideoFooter({ className, post }) {
    const currentUser = useSelector((state) => state.user.user)
    const [isLikedPost, setIsLikedPost] = useState(currentUser?.likes?.includes(post?.id) || false)
    // console.log(isLikedPost, post.id)
    console.log(currentUser)
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()
    const handleOnClickComment = function () {
        // console.log(post)
        navigate(useVideoPageRoute(post))
    }
    const [commentCount, setCommentCount] = useState()
    useEffect(() => {
        getCommentCount(post.id, (data) => {
            setCommentCount(data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    const handleLikePostAction = async function () {
        if (!currentUser.uid) {
            handleShowLogin(true)
            return
        }
        let updateUserLikePost
        let updatePostIsLiked
        if (isLikedPost) {
            try {
                updateUserLikePost = currentUser?.likes.filter((like) => like !== post.id)
                updatePostIsLiked = post.likes - 1
                await Promise.all([
                    updateUserLikes(currentUser.uid, updateUserLikePost),
                    updatePostLike(post.id, updatePostIsLiked),
                ])
                setIsLikedPost(false)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                updateUserLikePost = [...currentUser.likes, post.id]
                updatePostIsLiked = post.likes + 1
                await Promise.all([
                    updateUserLikes(currentUser?.uid, updateUserLikePost),
                    updatePostLike(post?.id, updatePostIsLiked),
                ])
                setIsLikedPost(true)
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            {showLogin && (
                <FullScreenModal handleShowPopup={handleShowLogin}>
                    <LoginPopup handleShowPopup={handleShowLogin} />
                </FullScreenModal>
            )}
            <div className={clsx('action-container', 'd-flex')}>
                <div onClick={handleLikePostAction} className={clsx('box', 'grid-center')}>
                    <Fragment>{!isLikedPost ? <HeartIcon /> : <HeartPrimary />}</Fragment>
                    {/* <HeartIcon /> */}
                </div>
                <span>{formatCountNumber(post?.likes)}</span>
            </div>
            <div onClick={handleOnClickComment} className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <CommentIcon />
                </div>
                <span>{commentCount}</span>
            </div>
            <div className={clsx('action-container', 'd-flex')}>
                <Menu menu={shareItems} placement={'top-start'} link={post.video}>
                    <div className={clsx('box', 'grid-center')}>
                        <ShareIcon />
                    </div>
                </Menu>
                <span>{formatCountNumber(post?.shares)}</span>
            </div>
        </div>
    )
}

export default VideoFooter
