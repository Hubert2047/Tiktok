import classNames from 'classnames/bind'
import { notification } from '~/staticData'
import { MentionIcon } from '../Icons'
import NotificationBlank from './NotificationBlank'
import styles from './Notifications.module.scss'
const clsx = classNames.bind(styles)
function Mention({ mentions, itemActive, className }) {
    return (
        <div className={clsx(className)}>
            <div className={clsx('mentions', 'd-flex')}>
                {!mentions?.length && itemActive.title === notification.constain.Mentions && (
                    <NotificationBlank
                        icon={<MentionIcon />}
                        title='Mentions of you'
                        desc='When someone mentions on you, you will see in here'
                    />
                )}
            </div>
        </div>
    )
}

export default Mention
