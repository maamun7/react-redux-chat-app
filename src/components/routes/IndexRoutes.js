import { Route, Routes } from 'react-router-dom';
import Conversation from '../../pages/Conversation';
import Inbox from '../../pages/Inbox';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const IndexRoutes = () => (
    <Routes>
        <Route
            exact
            path="/login"
            element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }
        />

        <Route
            exact
            path="/register"
            element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            }
        />

        <Route
            exact
            path="/"
            element={
                <PrivateRoute>
                    <Conversation />
                </PrivateRoute>
            }
        />

        <Route
            path="/inbox/:id"
            element={
                <PrivateRoute>
                    <Inbox />
                </PrivateRoute>
            }
        />
    </Routes>
);

export default IndexRoutes;
