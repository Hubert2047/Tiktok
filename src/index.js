import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import store, { persistor } from '~/redux'
import App from './App'
import GlobalStyle from './components/GlobalStyles'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <React.StrictMode>
    <GlobalStyle>
        <Provider store={store}>
            <PersistGate loading={true} persistor={persistor}>
                <div>
                    <App />
                </div>
            </PersistGate>
        </Provider>
    </GlobalStyle>
    // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
