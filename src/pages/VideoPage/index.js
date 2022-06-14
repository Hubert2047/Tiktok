/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useParams } from 'react-router-dom'
import Button from '~/components/Button'
import { CommentContainer, CommentInput } from '~/components/Comment'
import {
    CommentIcon,
    EmbedIcon,
    FaceBookIcon,
    HeartIcon,
    ReportIcon,
    SendToIcon,
    ShareIcon,
    TwitterIcon,
    WhatsAppIcon,
    XIcon,
} from '~/components/Icons'
import Loading from '~/components/Loading'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import { getPost } from '~/firebase'
import { useNavigate } from 'react-router-dom'
import { useProfileRoute } from '~/hooks'
import styles from './VideoPage.module.scss'
const clsx = classNames.bind(styles)
function VideoPage() {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    let params = useParams()
    const navigate = useNavigate()
    const postId = params.postId
    const handleNavigate = function () {
        navigate(useProfileRoute(post.user))
    }
    useEffect(() => {
        const getPostJSON = async function () {
            setLoading(true)
            const data = await getPost(postId)
            setPost(data)
            setLoading(false)
        }
        getPostJSON()
    }, [])
    return (
        <div>
            {loading && (
                <FullScreenModal className={clsx('loading')}>
                    <Loading />
                </FullScreenModal>
            )}
            {post.id && (
                <div className={clsx('wrapper')}>
                    <div className={clsx('video-container', 'grid-center')}>
                        <video
                            loop={true}
                            controls={true}
                            autoPlay={true}
                            className={clsx('video')}
                            src={post?.video}></video>
                        <Button to={'/'} icon={<XIcon />} type='btn-all-rounded' className={clsx('close-btn')} />
                        <Button
                            title='Report'
                            color={'color-white'}
                            icon={<ReportIcon />}
                            className={clsx('report-btn')}
                        />
                    </div>
                    <div className={clsx('right-container', 'd-flex')}>
                        <div className={clsx('top', 'd-flex')}>
                            <div className={clsx('header', 'd-flex')}>
                                <ProfileContainer user={post?.user}>
                                    <UserAvatar onClick={handleNavigate} height={'4rem'} user={post?.user} />
                                </ProfileContainer>
                                <div className={clsx('name-box', 'd-flex')}>
                                    <p className={clsx('full-name')}>{post?.user?.full_name}</p>
                                    <div className={clsx('d-flex', 'other-infor')}>
                                        <p className={clsx('nickname')}>{post?.user?.nickname}</p>
                                        <p className={clsx('time')}>{1}</p>
                                    </div>
                                </div>
                                <Button title='Follow' border={'border-primary'} size={'size-md'} />
                            </div>
                            <div className={clsx('content')}>
                                <div className={clsx('text')}>{post?.content} </div>
                            </div>
                            <div className={clsx('actions', 'd-flex')}>
                                <div className={clsx('action-left', 'd-flex')}>
                                    <div className={clsx('action-box', 'd-flex')}>
                                        <div className={clsx('icon-box', 'grid-center')}>
                                            <HeartIcon />
                                        </div>
                                        <span>{post?.likes}</span>
                                    </div>
                                    <div className={clsx('action-box', 'd-flex')}>
                                        <div className={clsx('icon-box', 'grid-center')}>
                                            <CommentIcon />
                                        </div>
                                        <span>{post?.comments?.length || 0}</span>
                                    </div>
                                </div>
                                <div className={clsx('action-right', 'd-flex')}>
                                    <EmbedIcon />
                                    <SendToIcon />
                                    <WhatsAppIcon />
                                    <FaceBookIcon className={clsx('fb-icon')} />
                                    <TwitterIcon />
                                    <ShareIcon width='2.4rem' height='2.4rem' />
                                </div>
                            </div>
                            <div className={clsx('copy-link', 'd-flex')}>
                                <input readOnly='readonly' value={post?.video} className={clsx('input-link')} />
                                <CopyToClipboard text={post?.video}>
                                    <Button title='Copy link' size='size-sm' className={clsx('link-btn')} />
                                </CopyToClipboard>
                            </div>
                        </div>
                        <CommentContainer className={clsx('comment')} />
                        <CommentInput className={clsx('comment-input')} />
                    </div>{' '}
                </div>
            )}
        </div>
    )
}

export default VideoPage
