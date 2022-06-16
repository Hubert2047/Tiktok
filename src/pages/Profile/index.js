import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from '~/components/Button'
import GetApp from '~/components/GetApp'
import { HorizontalThreeDot, LockIcon, PrivateIcon, ShareWhiteIcon } from '~/components/Icons'
import Loading from '~/components/Loading'
import Menu from '~/components/Menu'
import MovieContainer from '~/components/MovieContainer'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import UserAvatar from '~/components/UserAvatar'
import UserName from '~/components/UserName'
import { getUser, searchPost } from '~/firebase'
import { profileActions } from '~/redux/profileSlice'
import { profileActionIcons, shareItems } from '~/staticData'
import styles from './Profile.module.scss'

const clsx = classNames.bind(styles)

function Profile() {
    const params = useParams()
    const dispath = useDispatch()
    const profileUser = useSelector((state) => state.profile.profileUser)
    // console.log(params)
    const [userPosts, setUserPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)
    const getUserProfile = async function () {
        setLoading(true)
        try {
            const data = await Promise.all([searchPost(params.uid), getUser(params.uid)])
            // console.log(data)
            setUserPosts(data[0])
            dispath(profileActions.setProfileUser(data[1]))
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
    const handleVideoBtnClick = function () {
        setActive(false)
    }
    const handleLikeBtnClick = function () {
        setActive(true)
    }
    console.log(profileUser)
    return (
        <>
            {loading && (
                <FullScreenModal>
                    <Loading />
                </FullScreenModal>
            )}
            {profileUser.uid && (
                <div className={clsx('wrapper')}>
                    <div className={clsx('header', 'd-flex')}>
                        <div className={clsx('header-left')}>
                            <div className={clsx('share-infor', 'd-flex')}>
                                <UserAvatar user={profileUser} height='11.6rem' />
                                <div className={clsx('share-title', 'd-flex')}>
                                    <UserName className={clsx('name')} user={profileUser} />
                                    <Button
                                        title='Follow'
                                        type='btn-primary'
                                        bg='bg-primary'
                                        color='color-white'
                                        className={clsx('follow-btn')}
                                    />
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
                                    <strong>{profileUser.likes || 0}</strong>
                                    <span>Likes</span>
                                </div>
                            </div>
                            <p className={clsx('desc-infor')}>{profileUser.desc}</p>
                        </div>
                        <div className={clsx('header-right', 'd-flex')}>
                            <Menu menu={shareItems}>
                                <div>
                                    <ShareWhiteIcon className={clsx('share-icon-btn')} />
                                </div>
                            </Menu>
                            <Menu menu={profileActionIcons}>
                                <HorizontalThreeDot />
                            </Menu>
                        </div>
                    </div>
                    <div className={clsx('content')}>
                        <div className={clsx('top-content', 'd-flex')}>
                            <Button onClick={handleVideoBtnClick} title='Videos' className={clsx('video-btn')} />
                            <Button
                                onClick={handleLikeBtnClick}
                                title='Liked'
                                className={clsx('liked-btn')}
                                icon={<LockIcon />}
                            />
                            <div className={clsx('line', { 'active-btn': active })}></div>
                        </div>
                        {active ? (
                            <div className={clsx('private-section', 'grid-center')}>
                                <div className={clsx('private-box', 'd-flex')}>
                                    <PrivateIcon />
                                    <h4>This user's liked videos are private</h4>
                                    <p>Videos liked by {profileUser.full_name} are currently hidden</p>
                                </div>
                            </div>
                        ) : (
                            <MovieContainer posts={userPosts} className={clsx('main-content')}>
                                <GetApp />
                            </MovieContainer>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile
