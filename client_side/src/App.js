import './App.css';
import Homepage from './components/Homepage';
import Chatpage from './components/Chatpage';
import {Route} from 'react-router-dom'


function App() {
  return (
      <div className='Appname'>
        <Route path='/' component={Homepage} exact/>
        <Route path='/chats' component={Chatpage} />
      </div>
  );
}

export default App;
