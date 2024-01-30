import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Layouts
import DefaultLayout from '../layouts/DefaultLayout';

//Protected
import ProtectedRoute from './ProtectedRoute';

//Pages
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import NotFound404 from '../pages/NotFound404';
//company
import MyVacancies from '../pages/company/MyVacancies';
import CreateEditVacancie from '../pages/company/CreateEditVacancie';
import ViewVacancie from '../pages/company/ViewVacancie';
//Candidate
import ProfileCandidate from '../pages/candidate/ProfileCandidate';
import MyCandidacy from '../pages/candidate/MyCandidacy';
import SearchVacancies from '../pages/candidate/SearchVacancies';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/company"
                        element={
                            <ProtectedRoute typeUser="Company">
                                <MyVacancies />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/company/myvacancies"
                        element={
                            <ProtectedRoute typeUser="Company">
                                <MyVacancies />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/candidate"
                        element={
                            <ProtectedRoute typeUser="Candidate">
                                <ProfileCandidate />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/candidate/profile"
                        element={
                            <ProtectedRoute typeUser="Candidate">
                                <ProfileCandidate />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/candidate/candidacy"
                        element={
                            <ProtectedRoute typeUser="Candidate">
                                <MyCandidacy />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vacancie"
                        element={
                            <ProtectedRoute typeUser="Candidate">
                                <SearchVacancies />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vacancie/:id"
                        element={
                            <ProtectedRoute typeUser="Company">
                                <ViewVacancie />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vacancie/create"
                        element={
                            <ProtectedRoute typeUser="Company">
                                <CreateEditVacancie />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vacancie/edit/:id"
                        element={
                            <ProtectedRoute typeUser="Company">
                                <CreateEditVacancie />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
