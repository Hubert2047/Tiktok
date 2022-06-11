import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { MusicIcon } from '../Icons'
import { HagTag } from '../Icons/index'
import styles from './DiscoverContainer.module.scss'
const clsx = classNames.bind(styles)
function DiscoverContainer({ discovers, className }) {
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <h4 className={clsx('title')}>Discover</h4>
            <div className={clsx('discover-box', 'd-flex')}>
                {discovers?.map((discover) => {
                    let Icon = HagTag
                    if (discover.type === 'video') {
                        Icon = MusicIcon
                    }
                    return (
                        <Button
                            key={discover.id}
                            title={discover.title}
                            icon={<Icon />}
                            type={'btn-rounded'}
                            border={'border-grey'}
                            className={clsx('discover-btn')}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default DiscoverContainer
