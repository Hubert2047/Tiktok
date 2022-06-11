import classNames from 'classnames/bind'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import UserName from '~/components/UserName'
import Video from '~/components/Video'
import Button from '../Button'
import { MusicIcon } from '../Icons'
import { memo } from 'react'
import styles from './PostContainer.module.scss'
const clsx = classNames.bind(styles)
function PostContainer({ post, onPlay, isPlaying }) {
    return (
        <div
            className={clsx('wrapper', 'd-flex')}
            onMouseEnter={() => {
                onPlay(post.id)
            }}>
            <ProfileContainer user={post.user}>
                <UserAvatar user={post.user} height='5.6rem' className={clsx('avatar')} />
            </ProfileContainer>
            <div className={clsx('content', 'd-flex')}>
                <div className={clsx('header', 'd-flex')}>
                    <UserName user={post.user} className={clsx('name')} />
                    <p className={clsx('disc')}>Let’s go Fishing 🎣</p>
                    <div className={clsx('tag')}>
                        <MusicIcon />
                        original sound - Zuvaan_Masveriya
                    </div>
                </div>
                <Video post={post} className={clsx('video')} isPlaying={isPlaying} />
            </div>
            <Button
                title='Follow'
                border={'border-primary'}
                size={'size-sm'}
                color={'color-primary'}
                className={clsx('follow-btn')}
            />
        </div>
    )
}

export default memo(PostContainer)
