/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserName from '~/components/UserName'
import { formatCountNumber, handleFollowingUser } from '~/helper'
import { useProfileRoute } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import Button from '../Button'
import { LoginPopup } from '../Popper'
import UserAvatar from '../UserAvatar'
import styles from './ProfileContainer.module.scss'
const clsx = classNames.bind(styles)
function ProfileContainer({ user, children, placement }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const currentUser = useSelector((state) => state.user.user)
    const [isFollowing, setIsFollowing] = useState()
    useEffect(() => {
        setIsFollowing(currentUser?.following?.includes(user.id))
    }, [currentUser])
    const handleNavigate = function () {
        navigate(useProfileRoute(user))
    }
    const handleFollowing = async function () {
        try {
            const result = await handleFollowingUser(currentUser, user, isFollowing)
            if (result?.showLogin) {
                dispath(containerPortalActions.setComponent({ component: <LoginPopup />, onClickOutside: true }))
                return
            }
            //data is realtime so we dont have to manually state
        } catch (error) {
            console.log(error)
        }
    }
    const renderProfileContainer = function () {
        return (
            <div className={clsx('wrapper', 'd-flex')}>
                <div className={clsx('header', 'd-flex')}>
                    <UserAvatar
                        height={'5.5rem'}
                        user={user}
                        className={clsx('avatar')}
                        showLive
                        onClick={handleNavigate}
                    />
                    {currentUser.uid !== user?.uid && (
                        <Fragment>
                            {isFollowing ? (
                                <Button
                                    onClick={handleFollowing}
                                    title={'Following'}
                                    border={'border-grey'}
                                    color={'color-grey'}
                                    size='size-md'
                                    className={clsx('btn')}
                                />
                            ) : (
                                <Button
                                    onClick={handleFollowing}
                                    title={'Follow'}
                                    color={'color-white'}
                                    size='size-md'
                                    bg={'bg-primary'}
                                    className={clsx('btn', 'unFollowing-btn')}
                                />
                            )}
                        </Fragment>
                    )}
                </div>
                <UserName user={user} onClick={handleNavigate} />
                <div className={clsx('footer', 'd-flex')}>
                    <div className={clsx('box', 'd-flex')}>
                        <span className={clsx('count-text')}>{formatCountNumber(user?.followers)}</span>
                        <span className={clsx('desc-text')}>Followers</span>
                    </div>
                    <div className={clsx('box', 'd-flex')}>
                        <span className={clsx('count-text')}>{user?.likes?.length || 0}</span>
                        <span className={clsx('desc-text')}>Likes</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            <Tippy
                appendTo={() => document.body}
                delay={[500, 50]} //delay to fade out
                // offset={[0, -150]} //change position
                placement={placement}
                interactive={true}
                // visible={true}
                // trigger={'click'}
                render={renderProfileContainer}>
                <div onClick={handleNavigate}>{children}</div>
            </Tippy>
        </Fragment>
    )
}

export default ProfileContainer
