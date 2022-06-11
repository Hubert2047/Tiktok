import classNames from 'classnames/bind'
import GetApp from '~/components/GetApp'
import styles from './SnapScrollContainer.module.scss'
const clsx = classNames.bind(styles)
function SnapScrollContainer({ children }) {
    //snap to each header element
    return (
        <div className={clsx('wrapper')}>
            {children}
            <GetApp />
        </div>
    )
}

export default SnapScrollContainer
