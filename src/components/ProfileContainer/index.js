/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import UserName from '~/components/UserName'
import { useProfileRoute } from '~/hooks'
import Button from '../Button'
import UserAvatar from '../UserAvatar'
import styles from './ProfileContainer.module.scss'
const clsx = classNames.bind(styles)
function ProfileContainer({ user, children, placement }) {
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
                        height={'4rem'}
                        user={user}
                        className={clsx('avatar')}
                        showLive
                    />
                    {/* <Image src={user.avatar} alt={'avatar'} className={clsx('img')} /> */}
                    <Button
                        size='size-md'
                        title={'Follow'}
                        bg={'bg-primary'}
                        color={'color-white'}
                        className={clsx('btn')}
                    />
                </div>
                <UserName user={user} />
                <div className={clsx('footer', 'd-flex')}>
                    <div className={clsx('box', 'd-flex')}>
                        <span className={clsx('count-text')}>{user?.followers}</span>
                        <span className={clsx('desc-text')}>Followers</span>
                    </div>
                    <div className={clsx('box', 'd-flex')}>
                        <span className={clsx('count-text')}>{user?.likes}</span>
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
