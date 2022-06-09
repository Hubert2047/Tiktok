import classNames from 'classnames/bind'
import GetApp from '~/components/GetApp'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'
import styles from './SidebarLayout.module.scss'

const clsx = classNames.bind(styles)
function SidebarLayout({ children }) {
    return (
        <div className={clsx('wrapper')}>
            <Header />
            <div className={clsx('container')}>
                <div>
                    <Sidebar className={clsx('sidebar')} />
                </div>
                <div className={clsx('content')}>
                    {children}
                    <GetApp />
                </div>
            </div>
        </div>
    )
}

export default SidebarLayout
