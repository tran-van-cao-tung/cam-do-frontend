import './App.css';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from './routes';
import LayoutDefault from './Components/LayoutDefault/LayoutDefault';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import { AuthContext } from './helpers/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import API from './API';
import Auth from './Components/Login/Auth';
import NoAuth from './Components/Login/NoAuth';
import { isAvailableArray } from './helpers/utils';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
    const [currentBranchId, setCurrentBranchId] = useState(null);

    const resetToken = () =>{
        API({
            method: 'post',
            url: '/authentication/reloadToken',

            data: {
                accessToken: localStorage.getItem('accessToken'),
            },
        }).then((res) => {
            localStorage.setItem('accessToken', res.data.token.accessToken);
            setToken(res.data.token.accessToken);
        })
    }
    const getUserData = () =>{
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
                    setAuthState(res.data);
                    setUserInfo(res.data?.user);
                    const _permissions = res.data?.user.userPermission;
                    setPermissions(isAvailableArray(_permissions) ? _permissions : []);
                    setCurrentBranchId(() => {
                        if (isAvailableArray(res.data?.branchIds)) {
                            return res.data.branchIds[0];
                        }
                        return null;
                    });
                })
                .catch((err) => {
                    handleSignOut();
                    window.location.reload();
                });
        }
    }
    useEffect(() => {
        console.log('Trigger get user data');
        console.log('Token:', token);
        getUserData();
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

    const handleSignOut = useCallback(() => {
        setAuthState(initializeAuthState);
        setToken(null);
        localStorage.clear();
        sessionStorage.clear();
        setPermissions([]);
        setUserInfo(null);
    }, []);
    const values = {
        authState,
        setAuthState,
        setToken,
        setPermissions,
        permissions,
        userInfo,
        handleSignOut,
        token,
        currentBranchId,
        setCurrentBranchId,
        getUserData,
        resetToken,
    };

    return (
        <div className="App">
            <ToastContainer limit={5} position="top-right" autoClose={2000} />
            <AuthContext.Provider value={values}>
                <Routes>
                    <Route path="/auth" element={<NoAuth />}>
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/forgot" element={<ForgotPassword />} />
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
