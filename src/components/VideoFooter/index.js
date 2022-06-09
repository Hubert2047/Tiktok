import classNames from 'classnames/bind'
import { HeartIcon, CommentIcon, ShareIcon } from '~/components/Icons'
import styles from './VideoFooter.module.scss'
const clsx = classNames.bind(styles)
function VideoFooter() {
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <div className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <HeartIcon />
                </div>
                <span>10K</span>
            </div>
            <div className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <CommentIcon />
                </div>
                <span>1K</span>
            </div>
            <div className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <ShareIcon />
                </div>
                <span>9.2K</span>
            </div>
        </div>
    )
}

export default VideoFooter
