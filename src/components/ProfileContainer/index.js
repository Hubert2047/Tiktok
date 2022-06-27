/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserName from '~/components/UserName'
import { useProfileRoute } from '~/hooks'
import Button from '../Button'
import UserAvatar from '../UserAvatar'
import styles from './ProfileContainer.module.scss'
const clsx = classNames.bind(styles)
function ProfileContainer({ user, children, placement }) {
    const currentUser = useSelector((state) => state.user.user)
    const [isFollowing, setIsFollowing] = useState()
    useEffect(() => {
        setIsFollowing(currentUser?.following?.includes(user.id))
    }, [currentUser])
    const navigate = useNavigate()
    const handleNavigate = function () {
        navigate(useProfileRoute(user))
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
                        <span className={clsx('count-text')}>{user?.followers || 0}</span>
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
    )
}

export default ProfileContainer
