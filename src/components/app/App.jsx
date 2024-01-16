import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/SingleComicLayout/SingleComicLayout'));
const SingleCharLayout = lazy(() => import('../pages/SingleCharLayout/SingleCharLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route exact path="/" element={<MainPage />} />
                            <Route exact path="/comics" element={<ComicsPage />} />
                            <Route exact path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic' />} />
                            <Route exact path="/characters/:id" element={<SinglePage Component={SingleCharLayout} dataType='character' />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;