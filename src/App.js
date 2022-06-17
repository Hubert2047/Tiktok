import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { appActions } from '~/redux/appSlice'
import { publicRoutes } from '~/routes'
import Alert from './components/Popper/Alert'
function App() {
    const dispath = useDispatch()
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispath(appActions.setAuthState(true))
        } else {
            dispath(appActions.setAuthState(false))
        }
    })
    // console.log('re-render app')

    const alertInfor = useSelector((state) => state.alert.information)
    return (
        <Router>
            <div className='App'>
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
            {alertInfor.isShow && <Alert title={alertInfor.title} />}
        </Router>
    )
}

export default App
