/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '~/components/Button'
import { EditIcon, FriendIcon, HorizontalThreeDot, LockIcon, ShareWhiteIcon } from '~/components/Icons'
import Loading from '~/components/Loading'
import Menu from '~/components/Menu'
import MovieContainer from '~/components/MovieContainer'
import { LoginPopup } from '~/components/Popper'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import ProfileLikeSection from '~/components/ProfileLikeSection'
import UserAvatar from '~/components/UserAvatar'
import UserName from '~/components/UserName'
import { getUser, searchPost, updateFollowing } from '~/firebase'
import { useMessageRoute } from '~/hooks'
import { profileActions } from '~/redux/profileSlice'
import { profileActionIcons, shareItems } from '~/staticData'
import styles from './Profile.module.scss'

const clsx = classNames.bind(styles)

function Profile() {
    const params = useParams()
    const navigate = useNavigate()
    const dispath = useDispatch()
    const profileUser = useSelector((state) => state.profile.profileUser)
    const currentUser = useSelector((state) => state.user.user)
    const [isFollowing, setIsFollowing] = useState()
    const [showLogin, setShowLogin] = useState(false)
    const isCurrentUser = currentUser?.uid === profileUser?.uid
    const [reflow, setReflow] = useState(false)
    // console.log(params)
    const [userPosts, setUserPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [likeBtnActive, setLikeBtnActive] = useState(false)
    const [showDesc, setShowDesc] = useState({
        state: false,
        maxLine: 2,
    })
    const profileUserLikeCount = profileUser?.likes?.length || 0
    const getUserProfile = async function () {
        setLoading(true)
        try {
            const data = await Promise.all([searchPost(params.uid), getUser(params.uid)])
            // console.log(data)
            setUserPosts(data[0])
            dispath(profileActions.setProfileUser(data[1]))
            setIsFollowing(currentUser?.following?.includes(data[1].uid) || false)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    useEffect(() => {
        getUserProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.uid])
    useEffect(() => {
        // console.log('run', profileUser)
        setShowDesc({
            state: false,
            maxLine: 2,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileUser])
    useEffect(() => {
        handleReflow()
        setLikeBtnActive(false)
    }, [profileUser])
    const handleVideoBtnClick = function () {
        setLikeBtnActive(false)
    }
    const handleLikeBtnClick = function () {
        setLikeBtnActive(true)
    }
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    const handleUnfollowing = async function () {
        const updateUserFollowing = currentUser.following.filter((follow) => follow !== profileUser.uid) //delete current use
        await updateFollowing(currentUser.uid, updateUserFollowing)
        setIsFollowing(false)
    }
    const handleFollowing = async function () {
        if (!currentUser.uid) {
            setShowLogin(true)
            return
        }
        if (currentUser.uid === profileUser.uid) return
        let updateUserFollowing = []

        updateUserFollowing = [...(currentUser.following || []), profileUser.uid] //add current user
        await updateFollowing(currentUser.uid, updateUserFollowing)
        setIsFollowing(true)
    }
    const handleReflow = function (result) {
        // console.log(result, profileUser)
        if (result?.clamped) setReflow(result?.clamped)
    }
    const handleShowDesc = function () {
        setShowDesc((prev) => {
            if (prev.state) {
                return { state: false, maxLine: 2 }
            } else {
                return { state: true, maxLine: 12 }
            }
        })
    }
    const handleOnClickMessage = function () {
        navigate(useMessageRoute(profileUser))
    }

    return (
        <Fragment>
            {loading && (
                <FullScreenModal>
                    <Loading />
                </FullScreenModal>
            )}
            {showLogin && (
                <FullScreenModal handleShowPopup={handleShowLogin}>
                    <LoginPopup handleShowPopup={handleShowLogin} />
                </FullScreenModal>
            )}
            {profileUser.uid && (
                <div className={clsx('wrapper', 'd-flex')}>
                    <div className={clsx('header', 'd-flex')}>
                        <div className={clsx('header-left')}>
                            <div className={clsx('share-infor', 'd-flex')}>
                                <UserAvatar user={profileUser} height='11.6rem' />
                                <div className={clsx('share-title', 'd-flex')}>
                                    <UserName className={clsx('name')} user={profileUser} />
                                    {!isCurrentUser ? (
                                        <Fragment>
                                            {!isFollowing ? (
                                                <Button
                                                    onClick={handleFollowing}
                                                    title='Follow'
                                                    type='btn-primary'
                                                    bg='bg-primary'
                                                    color='color-white'
                                                    className={clsx('follow-btn')}
                                                />
                                            ) : (
                                                <div className={clsx('d-flex', 'action-box')}>
                                                    <Button
                                                        onClick={handleOnClickMessage}
                                                        color='color-primary'
                                                        title='Message'
                                                        border='border-primary'
                                                        className={clsx('message-icon')}
                                                    />
                                                    <Tippy content='Unfollow' placement='bottom-start'>
                                                        <div>
                                                            <Button
                                                                onClick={handleUnfollowing}
                                                                icon={<FriendIcon />}
                                                                border='border-grey'
                                                                className={clsx('friend-icon')}
                                                            />
                                                        </div>
                                                    </Tippy>
                                                </div>
                                            )}
                                        </Fragment>
                                    ) : (
                                        <Button
                                            className={clsx('edit-btn')}
                                            border='border-grey'
                                            title='Edit profile'
                                            icon={<EditIcon />}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={clsx('count-infor', 'd-flex')}>
                                <div className={clsx('count-infor-box', 'd-flex')}>
                                    <strong>{profileUser.following?.length || 0}</strong>
                                    <span>Following</span>
                                </div>
                                <div className={clsx('count-infor-box', 'd-flex')}>
                                    <strong>{profileUser.followers || 0}</strong>
                                    <span>Followers</span>
                                </div>
                                <div className={clsx('count-infor-box', 'd-flex')}>
                                    <strong>{profileUserLikeCount || 0}</strong>
                                    <span>{profileUserLikeCount > 1 ? 'Likes' : 'Like'}</span>
                                </div>
                            </div>
                            <LinesEllipsis
                                text={profileUser.desc || 'No bio Yet'}
                                maxLine={showDesc.maxLine}
                                ellipsis='...'
                                basedOn='words'
                                className={clsx('desc-infor')}
                                onReflow={handleReflow}
                            />

                            {reflow && (
                                <button onClick={handleShowDesc} className={clsx('desc-btn')}>
                                    {!showDesc.state ? 'See more ...' : 'See less ...'}
                                </button>
                            )}
                        </div>
                        <div className={clsx('header-right', 'd-flex')}>
                            <Menu menu={shareItems}>
                                <div>
                                    <ShareWhiteIcon className={clsx('share-icon-btn')} />
                                </div>
                            </Menu>
                            {!isCurrentUser && (
                                <Menu menu={profileActionIcons}>
                                    <HorizontalThreeDot />
                                </Menu>
                            )}
                        </div>
                    </div>
                    <div className={clsx('content', 'd-flex')}>
                        <div className={clsx('top-content', 'd-flex')}>
                            <Button onClick={handleVideoBtnClick} title='Videos' className={clsx('video-btn')} />
                            <Button
                                onClick={handleLikeBtnClick}
                                title='Liked'
                                className={clsx('liked-btn')}
                                icon={<LockIcon />}
                            />
                            <div className={clsx('line', { 'like-active-btn': likeBtnActive })}></div>
                        </div>
                        {likeBtnActive ? (
                            <div className={clsx('like-section-box', 'd-flex')}>
                                <ProfileLikeSection user={profileUser} isCurrentUser={isCurrentUser} />
                            </div>
                        ) : (
                            <MovieContainer posts={userPosts}>{/* <GetApp /> */}</MovieContainer>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Profile
