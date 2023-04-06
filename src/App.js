import './App.css';
import Login from './Components/Login/Login';
import { Route,Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import LayoutDefault from './Components/LayoutDefault/LayoutDefault';

function App() {
  var hours = 1; // to clear the localStorage after 1 hour
               // (if someone want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if(now-setupTime > hours*60*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
    }
}
  return (
    
    <div className="App">
    <Routes>
      <Route path='/login' element={<Login/>} />
      {publicRoutes.map((route,index)=>{
        const Layout = route.layout || LayoutDefault
        const Page = route.component
        return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
      })}
    </Routes>
    </div>
  );
}

export default App;
