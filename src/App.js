import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { getUserRealyTime, getNewNotification } from '~/firebase'
import { userActions } from '~/redux/userSlice'
import { privateRoutes, publicRoutes } from '~/routes'
import styles from './App.module.scss'
import ContainerPortal from './components/ContainerPortal'
import ToastPortal from './components/ToastPortal'
import MobileHomePage from './mobile/pages/MobileHomePage/index'
const clsx = classNames.bind(styles)
function App({ className }) {
    const viewWith = document.documentElement.clientWidth
    console.log('re-render app')
    const dispath = useDispatch()
    const currentUserId = useSelector((state) => state.user.currentUserId)

    useEffect(() => {
        if (currentUserId) {
            try {
                getUserRealyTime(currentUserId, (data) => {
                    dispath(userActions.setUser(data))
                })
            } catch (error) {
                console.log(error)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserId])
    return (
        <Router>
            {viewWith > 500 ? (
                <div className={clsx(className, 'app')}>
                    {!currentUserId ? (
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
                    ) : (
                        <Routes>
                            {[...publicRoutes, ...privateRoutes].map((route, index) => {
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
                    )}
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
            <ContainerPortal />
        </Router>
    )
}

export default App
