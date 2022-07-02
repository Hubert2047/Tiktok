import Header from '~/components/Header'
import classNames from 'classnames/bind'
import styles from './UploadLayout.module.scss'

const clsx = classNames.bind(styles)
function UploadLayout({ children }) {
    return (
        <div className={clsx('wrapper')}>
            <Header />
            <div className={clsx('children')}>{children}</div>
        </div>
    )
}

export default UploadLayout
