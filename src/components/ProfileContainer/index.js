import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import Image from '~/components/Image'
import UserName from '~/components/UserName'
import Button from '../Button'
import UserAvatar from '../UserAvatar'
import styles from './ProfileContainer.module.scss'
const clsx = classNames.bind(styles)
function ProfileContainer({ user, children }) {
    return (
        <Tippy
            appendTo={() => document.body}
            delay={[500, 50]} //delay to fade out
            offset={[0, -150]} //change position
            placement={'right-end'}
            interactive={true}
            // trigger={'click'}
            render={(attrs) => (
                <div className={clsx('wrapper', 'd-flex')} tabIndex='-1' {...attrs}>
                    <div className={clsx('header', 'd-flex')}>
                        <UserAvatar
                            user={user}
                            className={clsx('img')}
                         
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
            )}>
            {children}
        </Tippy>
    )
}

export default ProfileContainer
