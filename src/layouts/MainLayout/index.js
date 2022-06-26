import Header from '~/components/Header'
import classNames from 'classnames/bind'
import styles from './MainLayout.module.scss'

const clsx = classNames.bind(styles)
function MainLayout({ children }) {
    return (
        <div className={clsx('wrapper')}>
            <Header />
            <div className={clsx('children')}>{children}</div>
        </div>
    )
}

export default MainLayout
