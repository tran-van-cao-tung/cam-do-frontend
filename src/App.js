import './App.css';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import LayoutDefault from './Components/LayoutDefault/LayoutDefault';
import Unlogin from './Components/UnLogin/Unlogin';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import callAPI from './API';

function App() {
    var hours = 24; // to clear the localStorage after 1 hour
    // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now);
    } else {
        if (now - setupTime > hours * 60 * 60 * 1000) {
            localStorage.clear();
            localStorage.setItem('setupTime', now);
        }
    }

    const [authState, setAuthState] = useState({
        userName: "",
        userId: 0,
        branchId : 0,
        status: false,
    });

    useEffect(() => {
        const data = {
            accessToken : localStorage.getItem('accessToken'),
        }
        callAPI({
            method: 'post',
            url: `authentication/decrypttoken`,
            data: data,
        }).then((res) => {
            setAuthState({
                userName: res.data.name,
                userId: res.data.userId,
                branchId : res.data.branchId,
                status: true,
            });
        }).catch((err) => {
            setAuthState({ ...authState, status: false });
        });
    },[])

    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/unlogin" element={<Unlogin />} />
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || LayoutDefault;
                        const Page = route.component;
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
                        );
                    })}
                </Routes>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
