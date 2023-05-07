import './App.css';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from './routes';
import LayoutDefault from './Components/LayoutDefault/LayoutDefault';
import Unlogin from './Components/UnLogin/Unlogin';
import { AuthContext } from './helpers/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import API from './API';

import Auth from './Components/Login/Auth';
import NoAuth from './Components/Login/NoAuth';

const initializeAuthState = {
    userName: '',
    userId: '',
    branchId: 1,
    status: false,
};
function App() {
    const [userInfo, setUserInfo] = useState({});

    const [authState, setAuthState] = useState(initializeAuthState);

    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        console.log('Trigger get user data');
        console.log('Token:', token);
        if (token) {
            const data = {
                accessToken: token,
            };
            API({
                method: 'post',
                url: `authentication/decrypttoken`,
                data: data,
            })
                .then((res) => {
                    setAuthState({
                        userName: res.data.name,
                        userId: res.data.userId,
                        branchId: res.data.branchId,
                        status: true,
                    });
                })
                .catch((err) => {
                    setAuthState({ ...authState, status: false });
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
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
    }, []);

    //get dữ liệu Lấy userId
    useEffect(() => {
        if (authState.userId) {
            API({
                method: 'get',
                url: `/user/getUserById/${authState.userId}`,
            })
                .then((res) => {
                    setUserInfo(res.data);
                })
                .catch((err) => console.log(err));
            console.log(authState);
        }
    }, [authState]);

    const handleSignOut = useCallback(() => {
        setAuthState(initializeAuthState);
        setToken(null);
        localStorage.clear();
        sessionStorage.clear();
        setPermissions([]);
        userInfo(null);
    }, []);
    const values = { authState, setAuthState, setToken, setPermissions, permissions, userInfo, handleSignOut, token };

    return (
        <div className="App">
            <AuthContext.Provider value={values}>
                <Routes>
                    <Route path="/auth" element={<NoAuth />}>
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/unlogin" element={<Unlogin />} />
                    </Route>
                    <Route path="/" element={<Auth />}>
                        {privateRoutes.map((route, index) => {
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
                    </Route>
                </Routes>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
