/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import UserName from '~/components/UserName'
import Video from '~/components/Video'
import { updateFollowing } from '~/firebase'
import { useProfileRoute } from '~/hooks'
import { homeActions } from '~/redux/homeSlice'
import { userActions } from '~/redux/userSlice'
import Button from '../Button'
import { LoginPopup } from '../Popper'
import FullScreenModal from '../Popper/FullScreenModal'
import styles from './PostContainer.module.scss'
let time
const clsx = classNames.bind(styles)
const PostContainer = forwardRef(({ post }, ref) => {
    // console.log('re-render post container', post.id)
    const dispath = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const [showallContent, setShowAllContent] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [isFollowing, setIsFollowing] = useState()
    const currentPostPlayingId = useSelector((state) => state.home.currentPostPlayingId)
    const observer = useRef()
    const postRef = useRef()
    const handleOnMouseEnter = useCallback(() => {
        setShowAllContent(setIsClamped(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (time) clearTimeout(time)
                    console.log('intersecting', post.id)
                    time = setTimeout(() => {
                        console.log('run', post.id)
                        dispath(homeActions.setCurrentPostPlayingId(post.id))
                    }, 800)
                }
            },
            { threshold: 0.5 }
        )
        if (postRef.current) {
            observer.current.observe(postRef.current)
        }
        return () => {
            clearTimeout(time)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        setIsFollowing(currentUser?.following?.includes(post.user.uid) || false)
    }, [currentUser])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleNavigate = useCallback(() => {
        navigate(useProfileRoute(post.user))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    const handleReflow = function (rleState) {
        setIsClamped(rleState.clamped)
    }
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    const handleFollowing = async function () {
        if (!currentUser.uid) {
            setShowLogin(true)
            return
        }
        if (currentUser.uid === post.user.uid) return
        let updateUserFollowing = []
        if (isFollowing) {
            updateUserFollowing = currentUser.following.filter((follow) => follow !== post.user.uid) //delete current use
            await updateFollowing(currentUser.uid, updateUserFollowing)
            setIsFollowing(false)
        } else {
            updateUserFollowing = [...(currentUser.following || []), post.user.uid] //add current user
            await updateFollowing(currentUser.uid, updateUserFollowing)
            setIsFollowing(true)
        }
    }
    return (
        <div ref={ref} className={clsx('wrapper', 'd-flex')}>
            {showLogin && (
                <FullScreenModal handleShowPopup={handleShowLogin}>
                    <LoginPopup handleShowPopup={handleShowLogin} />
                </FullScreenModal>
            )}

            <ProfileContainer user={post.user} placement='left-start'>
                <UserAvatar onClick={handleNavigate} user={post.user} height='5.6rem' className={clsx('avatar')} />
            </ProfileContainer>

            <div ref={postRef} className={clsx('content', 'd-flex')}>
                <div className={clsx('header', 'd-flex')}>
                    <UserName user={post.user} className={clsx('name')} />
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
                            <p className={clsx('disc')}>{post?.content}</p>
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
                </div>

                <Video
                    post={post}
                    onMouseEnter={handleOnMouseEnter}
                    isCurrentPostPlaying={currentPostPlayingId === post.id}
                    className={clsx('video')}
                />
            </div>
            <Button
                onClick={handleFollowing}
                title={isFollowing ? 'Following' : 'Follow'}
                border={isFollowing ? 'border-grey' : 'border-primary'}
                size={'size-sm'}
                color={isFollowing ? 'color-grey' : 'color-primary'}
                className={clsx('follow-btn')}
            />
        </div>
    )
})

export default memo(PostContainer)
