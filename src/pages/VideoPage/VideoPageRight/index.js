/* eslint-disable react-hooks/rules-of-hooks */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import React, { Fragment } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import Comfirm from '~/components/Comfirm'
import { CommentContainer, CommentInput } from '~/components/Comment'
import {
    CommentIcon,
    EmbedIcon,
    FaceBookIcon,
    HeartIcon,
    HeartPrimary,
    HorizontalThreeDot,
    LiveIcon,
    SendToIcon,
    ShareIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '~/components/Icons'
import Loading from '~/components/Loading'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import { deletePost } from '~/firebase'
import { convertTimeStampToDate, formatCountNumber } from '~/helper'
import { useProfileRoute } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { toastActions } from '~/redux/toastSlice'
import styles from '../VideoPage.module.scss'

const clsx = classNames.bind(styles)
function VideoPageRight({
    currentPlayVideo,
    currentUser,
    isFollowing,
    handleLikePostAction,
    handleStartVideo = () => {},
    handleFollowing,
    isLikedPost,
    commentCount,
    setShowCommentBox,
    className,
}) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const handleDeletePostOnSubmit = async function () {
        try {
            dispath(containerPortalActions.setComponent({ component: <Loading />, onClickOutside: true }))
            await deletePost(currentPlayVideo.id)
            dispath(containerPortalActions.setComponent(null)) //close loading
            dispath(toastActions.addToast({ message: 'Deleted', mode: 'success' }))
            navigate(useProfileRoute(currentUser))
        } catch (error) {
            dispath(containerPortalActions.setComponent(null))

            console.log(error)
        }
    }
    const handleDeletePost = async function () {
        console.log('run')
        dispath(
            containerPortalActions.setComponent({
                component: (
                    <Comfirm
                        question='Are you sure you want to delete this video?'
                        subMitTitle='Delete'
                        onSubmit={handleDeletePostOnSubmit}
                    />
                ),
                onClickOutside: true,
            })
        )
    }
    const handleCopyLink = function () {
        dispath(toastActions.addToast({ message: 'Copied!', mode: 'success' }))
    }
    const Actions = function ({ placement }) {
        return (
            <Tippy
                // trigger='click'
                // hideOnClick={true}
                // visible={visible}
                // disabled={true}
                offset={[-10, 0]}
                placement={placement}
                interactive={true}
                render={(attrs) => (
                    <div className={clsx('action-options', 'd-flex')} {...attrs}>
                        <Button to='.' title='Private Setting' color='color-white' className={clsx('option-btn')} />
                        <Button
                            to='.'
                            onClick={handleDeletePost}
                            title='Delete'
                            color='color-white'
                            className={clsx('option-btn')}
                        />
                    </div>
                )}>
                <div className={clsx('conversation-btn-box')}>
                    <HorizontalThreeDot className={clsx('conversation-btn')} />
                </div>
            </Tippy>
        )
    }
    const handleNavigate = function () {
        navigate(useProfileRoute(currentPlayVideo.postUser))
    }
    const handleWatchVideo = function () {
        handleStartVideo(true)
        setShowCommentBox(false)
        // console.log('run')
    }
    return (
        <div className={clsx('right-container', 'd-flex', className)}>
            <div className={clsx('top', 'd-flex')}>
                <div className={clsx('header', 'd-flex')}>
                    <ProfileContainer user={currentPlayVideo?.postUser}>
                        <UserAvatar onClick={handleNavigate} height={'4rem'} user={currentPlayVideo?.postUser} />
                    </ProfileContainer>
                    <div className={clsx('name-box', 'd-flex')}>
                        <p className={clsx('full-name')}>{currentPlayVideo?.postUser?.full_name}</p>
                        <div className={clsx('d-flex', 'other-infor')}>
                            {currentPlayVideo?.postUser?.nickname && (
                                <p className={clsx('nickname')}>{currentPlayVideo?.postUser?.nickname}</p>
                            )}
                            <p className={clsx('time')}>{convertTimeStampToDate(currentPlayVideo?.createdAt)}</p>
                        </div>
                    </div>

                    <div onClick={handleWatchVideo} className={clsx('watch-box')}>
                        <LiveIcon className={clsx('watch-video')} />
                    </div>

                    <div className={clsx('header-action-group')}>
                        {currentUser?.uid === currentPlayVideo?.uid ? (
                            <div className={clsx('header-action-box')}>
                                <Actions placement={'left-start'} />
                            </div>
                        ) : (
                            <div className={clsx('header-action-box')}>
                                <Button
                                    className={clsx('follow-btn')}
                                    title={isFollowing ? 'Following' : 'Follow'}
                                    onClick={handleFollowing}
                                    border={isFollowing ? 'border-grey' : 'border-primary'}
                                    color={isFollowing ? 'color-grey' : 'color-primary'}
                                    size={'size-md'}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={clsx('content')}>{currentPlayVideo.content}</div>
                <div className={clsx('actions', 'd-flex')}>
                    <div className={clsx('action-left', 'd-flex')}>
                        <div className={clsx('action-box', 'd-flex')}>
                            <div onClick={handleLikePostAction} className={clsx('icon-box', 'flex-center')}>
                                <Fragment>
                                    {!isLikedPost ? <HeartIcon className={clsx('action-icon')} /> : <HeartPrimary />}
                                </Fragment>
                            </div>
                            <span>{formatCountNumber(currentPlayVideo?.likes)}</span>
                        </div>
                        <div className={clsx('action-box', 'd-flex')}>
                            <div className={clsx('icon-box', 'flex-center')}>
                                <CommentIcon className={clsx('action-icon')} />
                            </div>
                            <span>{commentCount || 0}</span>
                        </div>
                    </div>
                    <div className={clsx('action-right', 'd-flex')}>
                        <EmbedIcon />
                        <SendToIcon />
                        <WhatsAppIcon />
                        <FaceBookIcon className={clsx('fb-icon')} />
                        <TwitterIcon />
                        <ShareIcon width='24px' height='24px' />
                    </div>
                </div>
                <div className={clsx('copy-link', 'd-flex')}>
                    <input readOnly='readonly' value={currentPlayVideo?.video} className={clsx('input-link')} />
                    <CopyToClipboard text={currentPlayVideo?.video}>
                        <Button
                            onClick={handleCopyLink}
                            title='Copy link'
                            size='size-sm'
                            className={clsx('link-btn')}
                        />
                    </CopyToClipboard>
                </div>
            </div>
            <CommentContainer post={currentPlayVideo} className={clsx('comment-container')} />
            <CommentInput className={clsx('cu-input')} post={currentPlayVideo} />
        </div>
    )
}

export default VideoPageRight
