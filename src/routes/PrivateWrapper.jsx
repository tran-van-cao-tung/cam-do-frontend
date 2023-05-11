import { useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import callAPI from '../API';
import { publicRoutes } from '.';
import LayoutDefault from '../Components/LayoutDefault/LayoutDefault';
import { Route } from 'react-router-dom';

const PrivateWrapper = () => {
    const { authState, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        const data = {
            accessToken: localStorage.getItem('accessToken'),
        };

        if (data?.accessToken) {
            callAPI({
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
    }, []);

    return publicRoutes.map((route, index) => {
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
    });
};

export default PrivateWrapper;
