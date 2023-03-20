import './App.css';
import Login from './Components/Login/Login';
import { Route,Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import LayoutDefault from './Components/LayoutDefault/LayoutDefault';
import axios from 'axios';
function App() {
 
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  

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
