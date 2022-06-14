/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { forwardRef, memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import UserName from '~/components/UserName'
import Video from '~/components/Video'
import config from '~/config'
import Button from '../Button'
import { useProfileRoute } from '~/hooks'
import styles from './PostContainer.module.scss'
const clsx = classNames.bind(styles)
const PostContainer = forwardRef(({ post, onPlay, isPlaying }, ref) => {
    // console.log('re-render -post')
    // console.log('re-render post container', post.id)
    const navigate = useNavigate()
    const limitText = 30
    const [showAllContent, setShowAllContent] = useState({
        isShowAll: post?.content?.split('').length < limitText,
        title: 'show all ...',
    })
    const handleShowAllContent = function () {
        // console.log('llfe')
        setShowAllContent((prev) => {
            return { isShowAll: !prev.isShowAll, title: prev.title === 'show all ...' ? 'show less' : 'show all ...' }
        })
    }
    const handleOnMouseEnter = useCallback(() => {
        setShowAllContent({ isShowAll: false, title: 'show all ...' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleNavigate = useCallback(() => {
        navigate(useProfileRoute(post.user))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    return (
        <div
            ref={ref}
            className={clsx('wrapper', 'd-flex')}
            onMouseEnter={() => {
                onPlay(post.id)
            }}>
            <ProfileContainer user={post.user} placement='left-start'>
                <UserAvatar onClick={handleNavigate} user={post.user} height='5.6rem' className={clsx('avatar')} />
            </ProfileContainer>
            <div className={clsx('content', 'd-flex')}>
                <div className={clsx('header', 'd-flex')}>
                    <UserName user={post.user} className={clsx('name')} />
                    <div className={clsx('content-box', 'd-flex')}>
                        <p className={clsx('disc', { 'show-less': !showAllContent.isShowAll })}>{post?.content}</p>
                        {post?.content?.split('').length > limitText && (
                            <button onClick={handleShowAllContent} className={clsx('show-content-btn')}>
                                {showAllContent.title}
                            </button>
                        )}
                    </div>
                </div>
                <Video post={post} onMouseEnter={handleOnMouseEnter} className={clsx('video')} isPlaying={isPlaying} />
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
})

export default memo(PostContainer)
