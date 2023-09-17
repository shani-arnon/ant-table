import ReactDOM from 'react-dom/client'
import store from './state/store.ts'
import { Provider } from 'react-redux'
import GlobalStyle from './globalStyles.ts';
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>
)
