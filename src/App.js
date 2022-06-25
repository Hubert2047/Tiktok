import classNames from 'classnames/bind'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import styles from './App.module.scss'
import ToastPortal from './components/ToastPortal'
import MobileHomePage from './mobile/pages/MobileHomePage/index'
const clsx = classNames.bind(styles)
function App({ className }) {
    const viewWith = document.documentElement.clientWidth

    return (
        <Router>
            {viewWith > 500 ? (
                <div className={clsx(className, 'app')}>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.page
                            const Layout = route.layout
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Routes>
                </div>
            ) : (
                <div className={clsx('mobile-app')}>
                    <Routes>
                        <Route path={'/'} element={<MobileHomePage />} />
                        <Route path={'*'} element={<Navigate to='/' replace={true} />} />
                    </Routes>
                </div>
            )}
            <ToastPortal />
        </Router>
    )
}

export default App
