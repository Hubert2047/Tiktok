import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { MusicIcon } from '../Icons'
import styles from './DiscoverContainer.module.scss'
import { HagTag } from '../Icons/index'
const clsx = classNames.bind(styles)
function DiscoverContainer({ discovers, className }) {
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <h4 className={clsx('title')}>Discover</h4>
            {discovers?.map((disvover) => {
                let Icon = HagTag
                if (disvover.type === 'video') {
                    Icon = MusicIcon
                }
                return (
                    <Button
                        key={disvover.id}
                        title={disvover.title}
                        icon={<Icon />}
                        type={'btn-rounded'}
                        border={'border-grey'}
                        className={clsx('discover-btn')}
                    />
                )
            })}
        </div>
    )
}

export default DiscoverContainer
