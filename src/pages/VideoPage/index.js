import classNames from 'classnames/bind'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
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
import ProfileContainer from '~/components/ProfileContainer'
import UserAvatar from '~/components/UserAvatar'
import { floowingUsers } from '~/staticData'
import styles from './VideoPage.module.scss'
const clsx = classNames.bind(styles)
function VideoPage() {
    // let videoId = useParams()
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <div className={clsx('video-container', 'grid-center')}>
                <video
                    loop={true}
                    controls={true}
                    className={clsx('video')}
                    src='https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2Fc9ef3e0d-fb8f-40aa-8605-8c231f0143cc.mp4?alt=media&token=e3206451-71ea-4cd8-a8c3-7e53ed1b7733'></video>
                <Button to={'/'} icon={<XIcon />} type='btn-all-rounded' className={clsx('close-btn')} />
                <Button title='Report' color={'color-white'} icon={<ReportIcon />} className={clsx('report-btn')} />
            </div>

            <div className={clsx('right-container', 'd-flex')}>
                <div className={clsx('top', 'd-flex')}>
                    <div className={clsx('header', 'd-flex')}>
                        <ProfileContainer user={floowingUsers[0]}>
                            <UserAvatar height={'4rem'} user={floowingUsers[0]} />
                        </ProfileContainer>
                        <div className={clsx('name-box', 'd-flex')}>
                            <p className={clsx('full-name')}>{floowingUsers[0].full_name}</p>
                            <div className={clsx('d-flex', 'other-infor')}>
                                <p className={clsx('nickname')}>{floowingUsers[0].nickname}</p>
                                <p className={clsx('time')}>2w ago</p>
                            </div>
                        </div>
                        <Button title='Follow' border={'border-primary'} size={'size-md'} />
                    </div>
                    <div className={clsx('content')}>
                        <div className={clsx('text')}>我的LINE好像也什麼訊息耶😓😓 #純粹分享 #默默 #情感 </div>
                    </div>
                    <div className={clsx('actions', 'd-flex')}>
                        <div className={clsx('action-left', 'd-flex')}>
                            <div className={clsx('action-box', 'd-flex')}>
                                <div className={clsx('icon-box', 'grid-center')}>
                                    <HeartIcon />
                                </div>
                                <span>1.1K</span>
                            </div>
                            <div className={clsx('action-box', 'd-flex')}>
                                <div className={clsx('icon-box', 'grid-center')}>
                                    <CommentIcon />
                                </div>
                                <span>1.25K</span>
                            </div>
                        </div>
                        <div className={clsx('action-right', 'd-flex')}>
                            <EmbedIcon />
                            <SendToIcon />
                            <WhatsAppIcon />
                            <FaceBookIcon />
                            <TwitterIcon />
                            <ShareIcon width='2.4rem' height='2.4rem' />
                        </div>
                    </div>
                    <div className={clsx('copy-link', 'd-flex')}>
                        <input
                            readOnly='readonly'
                            value={
                                'https://v16-webapp.tiktok.com/362afc0809f049893b6e2d148afe2a27/62a26942/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/4b07a5c51e8f4c31815881b691884fc6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1346&bt=673&btag=80000&cs=0&ds=3&ft=JpusWhWH6BMfmpFjr0P4GwyO-pi&mime_type=video_mp4&qs=0&rc=aDtoODVpNzs0NDc4aGk6NEBpaml4OGQ6ZnM7ZDMzZjczM0BfYDIxLTE2NTAxNTEzYjMzYSNfczZocjQwbWRgLS1kMWNzcw%3D%3D&l=202206091541490102450110691F28B1CE'
                            }
                            className={clsx('input-link')}
                        />
                        <CopyToClipboard text={'value123'}>
                            <Button title='Copy link' size='size-sm' className={clsx('link-btn')} />
                        </CopyToClipboard>
                    </div>
                </div>
                <CommentContainer />
                <CommentInput className={clsx('comment-input')} />
            </div>
        </div>
    )
}

export default VideoPage
