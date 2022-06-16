import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import Alert from './components/Popper/Alert'
function App() {
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
