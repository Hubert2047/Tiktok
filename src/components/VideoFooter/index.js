/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CommentIcon, HeartIcon, HeartPrimary, ShareIcon } from '~/components/Icons'
import Menu from '~/components/Menu'
import { LoginPopup } from '~/components/Popper'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import { getCommentCount } from '~/firebase'
import { formatCountNumber, handleLikePost } from '~/helper'
import { useVideoPageRoute } from '~/hooks'
import { shareItems } from '~/staticData'
import styles from './VideoFooter.module.scss'

const clsx = classNames.bind(styles)
function VideoFooter({ className, post }) {
    // const dispath = useDispatch()
    // console.log('re-render video footer')
    const currentUser = useSelector((state) => state.user.user)
    // console.log(currentUser, post.id)
    const [isLikedPost, setIsLikedPost] = useState(currentUser?.likes?.includes(post?.id) || false)
    // console.log(isLikedPost, post.id)
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()
    const handleOnClickComment = function () {
        navigate(useVideoPageRoute(post))
    }
    useEffect(() => {
        setIsLikedPost(currentUser?.likes?.includes(post?.id) || false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])
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
        try {
            const result = await handleLikePost(currentUser, post, isLikedPost)
            if (result?.showLogin) {
                handleShowLogin(true)
            }
        } catch (error) {
            console.log(error)
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
                <div onClick={handleLikePostAction} className={clsx('box', 'flex-center')}>
                    <Fragment>{!isLikedPost ? <HeartIcon /> : <HeartPrimary />}</Fragment>
                    {/* <HeartIcon /> */}
                </div>
                <span>{formatCountNumber(post?.likes)}</span>
            </div>
            <div onClick={handleOnClickComment} className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'flex-center')}>
                    <CommentIcon />
                </div>
                <span>{commentCount}</span>
            </div>
            <div className={clsx('action-container', 'd-flex')}>
                <Menu menu={shareItems} placement={'top-start'} link={post.video}>
                    <div className={clsx('box', 'flex-center')}>
                        <ShareIcon />
                    </div>
                </Menu>
                <span>{formatCountNumber(post?.shares)}</span>
            </div>
        </div>
    )
}

export default VideoFooter
