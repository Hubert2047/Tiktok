/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProfileContainer from '../ProfileContainer'
import UserName from '~/components/UserName'
import Video from '~/components/Video'
import { handleFollowingUser } from '~/helper'
import { useProfileRoute } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import Button from '../Button'
import { LoginPopup } from '../Popper'
import styles from './PostContainer.module.scss'
import UserAvatar from '../UserAvatar'

const clsx = classNames.bind(styles)

// interface Post {
//     id: string
//     uid: string
//     createdAt: Date
//     content: string
//     likes: number
//     shares: number
//     played: number
//     poster: string
//     url: string
//     user: User
// }
// interface Props {
//     post: Post
//     className: string
// }
const PostContainer = forwardRef(({ post, className }, ref) => {
    // console.log('re-render post container', post.id)
    const dispath = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const [showallContent, setShowAllContent] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const [isFollowing, setIsFollowing] = useState()
    const postRef = useRef(null)

    useEffect(() => {
        setIsFollowing(currentUser?.following?.includes(post.user.uid) || false)
    }, [currentUser])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleNavigate = useCallback(() => {
        navigate(useProfileRoute(post.user))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleReflow = function (rleState) {
        setIsClamped(rleState.clamped)
    }
    const handleFollowing = async function () {
        try {
            const result = await handleFollowingUser(currentUser, post.user, isFollowing)
            if (result.showLogin) {
                dispath(containerPortalActions.setComponent({ component: <LoginPopup />, onClickOutside: true }))
                return
            }
            //data is realtime so we dont have to update state
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div ref={ref} className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('pc-avatar')}>
                <ProfileContainer user={post.user} placement='left-start'>
                    <UserAvatar onClick={handleNavigate} user={post.user} height='5.6rem' className={clsx('avatar')} />
                </ProfileContainer>
            </div>

            <div ref={postRef} className={clsx('content', 'd-flex')}>
                <div className={clsx('header', 'd-flex')}>
                    <div className={clsx('name-box', 'd-flex')}>
                        <UserAvatar
                            onClick={handleNavigate}
                            user={post.user}
                            height='5.6rem'
                            className={clsx('avatar', 'mobile-avatar')}
                        />
                        <UserName user={post.user} className={clsx('name')} />
                    </div>
                    {post?.content && (
                        <div className={clsx('content-box', 'd-flex')}>
                            {!showallContent ? (
                                <LinesEllipsis
                                    text={post?.content}
                                    maxLine={1}
                                    ellipsis={' ...'}
                                    basedOn='words'
                                    onReflow={handleReflow}
                                />
                            ) : (
                                <p className={clsx('desc')}>{post?.content}</p>
                            )}
                            {isClamped && (
                                <button
                                    className={clsx('show-content-btn')}
                                    onClick={() => {
                                        setShowAllContent((prev) => !prev)
                                    }}>
                                    {!showallContent ? ' See more ...' : 'See less ...'}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <Video post={post} className={clsx('video')} />
            </div>
            {currentUser?.uid !== post.uid && (
                <Button
                    onClick={handleFollowing}
                    title={isFollowing ? 'Following' : 'Follow'}
                    border={isFollowing ? 'border-grey' : 'border-primary'}
                    size={'size-sm'}
                    color={isFollowing ? 'color-grey' : 'color-primary'}
                    className={clsx('follow-btn')}
                />
            )}
        </div>
    )
})

PostContainer.propTypes = {
    post: PropTypes.object.isRequired,
    classes: PropTypes.string,
}
export default memo(PostContainer)
