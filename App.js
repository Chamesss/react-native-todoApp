import { store } from './store'
import { Provider } from 'react-redux'
import Routes from './routes';
import 'react-native-gesture-handler';
import './global.css'

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}