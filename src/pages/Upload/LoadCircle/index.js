import classNames from 'classnames/bind'
import styles from './LoadCircle.module.scss'

const clsx = classNames.bind(styles)
function LoadCircle({ process, titleColor = 'white' }) {
    const _process = 226 - (226 * process) / 100
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('percent')}>
                <svg>
                    <circle strokeDashoffset={226} strokeDasharray={226} cx='36' cy='36' r='36'></circle>
                    <circle strokeDashoffset={_process} strokeDasharray={226} cx='36' cy='36' r='36'></circle>
                </svg>
                <div>
                    <h4 className={clsx('process', 'flex-center', titleColor)}>
                        {process}
                        <span>%</span>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default LoadCircle
