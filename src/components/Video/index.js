import classNames from 'classnames/bind'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReportIcon } from '~/components/Icons'
import Image from '~/components/Image'
import VideoFooter from '../VideoFooter'
import styles from './Video.module.scss'
const clsx = classNames.bind(styles)
function Video({ post, isPlaying, className }) {
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <Link to={`${post.user.full_name}/video/${post.id}`} className={clsx('video-box')}>
                <Image src={post.poster || ''} className={clsx('poster')} />
                {isPlaying && (
                    <video
                        autoPlay={true}
                        playsInline={true}
                        // controlsList='nofullscreen'
                        className={clsx('video')}
                        loop={true}
                        src={post.video}
                        controls={true}></video>
                )}
                <div className={clsx('report-box')}>
                    <ReportIcon />
                    <span>Report</span>
                </div>
            </Link>
            <VideoFooter className={clsx('video-footer')} />
        </div>
    )
}

export default Video
