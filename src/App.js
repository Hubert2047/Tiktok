import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from '~/routes'
function App() {
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
        </Router>
    )
}

export default App
