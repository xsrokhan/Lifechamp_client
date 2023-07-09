import './styles/App.css'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Home } from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

dayjs.extend(localizedFormat)

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
