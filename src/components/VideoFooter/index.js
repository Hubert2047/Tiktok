import classNames from 'classnames/bind'
import { HeartIcon, CommentIcon, ShareIcon } from '~/components/Icons'
import styles from './VideoFooter.module.scss'
const clsx = classNames.bind(styles)
function VideoFooter({ className, post }) {
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <HeartIcon />
                </div>
                <span>{post.likes}</span>
            </div>
            <div className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <CommentIcon />
                </div>
                <span>{post?.comments?.length}</span>
            </div>
            <div className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <ShareIcon />
                </div>
                <span>{post.shares}</span>
            </div>
        </div>
    )
}

export default VideoFooter
