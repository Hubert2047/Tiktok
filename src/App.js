import classNames from 'classnames/bind'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { appActions } from '~/redux/appSlice'
import { publicRoutes } from '~/routes'
import styles from './App.module.scss'
import Alert from './components/Popper/Alert'
import MobileHomePage from './mobile/pages/MobileHomePage/index'
const clsx = classNames.bind(styles)
function App({ className }) {
    const viewWith = document.documentElement.clientWidth
    // const dispath = useDispatch()
    // const auth = getAuth()
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         dispath(appActions.setAuthState(true))
    //     } else {
    //         dispath(appActions.setAuthState(false))
    //     }
    // })
    // console.log('re-render app')

    const alertInfor = useSelector((state) => state.alert.information)
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
                    </Routes>
                </div>
            )}
            {alertInfor.isShow && <Alert title={alertInfor.title} />}
        </Router>
    )
}

export default App
