import { BrowserRouter as Router } from 'react-router-dom';
import IndexRoutes from './components/routes/IndexRoutes';
import useAuthCheck from './hooks/useAuthCheck';

function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Checking authentication....</div>
    ) : (
        <Router>
            <IndexRoutes />
        </Router>
    );
}

export default App;
