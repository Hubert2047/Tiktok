import classNames from 'classnames/bind'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import styles from './SidebarLayout.module.scss'

const clsx = classNames.bind(styles)
function SidebarLayout({ children }) {
    return (
        <div className={clsx('wrapper')}>
            <Header />
            <div className={clsx('container')}>
                <Sidebar />
                <div className={clsx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default SidebarLayout
