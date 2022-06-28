/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserName from '~/components/UserName'
import { updateFollowing } from '~/firebase'
import { formatCountNumber } from '~/helper'
import { useProfileRoute } from '~/hooks'
import Button from '../Button'
import { LoginPopup } from '../Popper'
import FullScreenModal from '../Popper/FullScreenModal'
import UserAvatar from '../UserAvatar'
import styles from './ProfileContainer.module.scss'
const clsx = classNames.bind(styles)
function ProfileContainer({ user, children, placement }) {
    const currentUser = useSelector((state) => state.user.user)
    const [showLogin, setShowLogin] = useState(false)
    const [isFollowing, setIsFollowing] = useState()
    useEffect(() => {
        setIsFollowing(currentUser?.following?.includes(user.id))
    }, [currentUser])
    const navigate = useNavigate()
    const handleNavigate = function () {
        navigate(useProfileRoute(user))
    }
    const handleFollowing = async function () {
        if (!currentUser.uid) {
            setShowLogin(true)
            return
        }
        if (currentUser.uid === user.uid) return
        let updateUserFollowing = []
        if (isFollowing) {
            updateUserFollowing = currentUser.following.filter((follow) => follow !== user.uid) //delete current use
            await updateFollowing(currentUser.uid, updateUserFollowing, user.id, user?.followers - 1)
            setIsFollowing(false)
        } else {
            updateUserFollowing = [...(currentUser.following || []), user.uid] //add current user
            await updateFollowing(currentUser.uid, updateUserFollowing, user.id, user?.followers || 0 + 1)
            setIsFollowing(true)
        }
    }
    const renderProfileContainer = function () {
        return (
            <div className={clsx('wrapper', 'd-flex')} tabIndex='-1'>
                <div className={clsx('header', 'd-flex')}>
                    <UserAvatar
                        onClick={handleNavigate}
                        height={'5.5rem'}
                        user={user}
                        className={clsx('avatar')}
                        showLive
                    />
                    <Button
                        onClick={handleFollowing}
                        title={isFollowing ? 'Following' : 'Follow'}
                        border={isFollowing ? 'border-grey' : 'border-primary'}
                        color={isFollowing ? 'color-grey' : 'color-white'}
                        size='size-md'
                        bg={isFollowing ? '' : 'bg-primary'}
                        className={clsx('btn')}
                    />
                </div>
                <UserName user={user} />
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
            {showLogin && (
                <FullScreenModal>
                    <LoginPopup />
                </FullScreenModal>
            )}
            <Tippy
                appendTo={() => document.body}
                delay={[500, 50]} //delay to fade out
                // offset={[0, -150]} //change position
                placement={placement}
                interactive={true}
                // visible={true}
                // trigger={'click'}
                render={renderProfileContainer}>
                <div>{children}</div>
            </Tippy>
        </Fragment>
    )
}

export default ProfileContainer
