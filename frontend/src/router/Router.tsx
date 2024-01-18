import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Layouts
import DefaultLayout from '../layouts/DefaultLayout';

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
                    <Route path="/company" element={<MyVacancies />} />
                    <Route
                        path="/company/myvacancies"
                        element={<MyVacancies />}
                    />
                    <Route path="/candidate" element={<ProfileCandidate />} />
                    <Route
                        path="/candidate/profile"
                        element={<ProfileCandidate />}
                    />
                    <Route
                        path="/candidate/candidacy"
                        element={<MyCandidacy />}
                    />
                    <Route path="/vacancie" element={<SearchVacancies />} />
                    <Route path="/vacancie/:id" element={<ViewVacancie />} />
                    <Route
                        path="/vacancie/create"
                        element={<CreateEditVacancie />}
                    />
                    <Route
                        path="/vacancie/edit/:id"
                        element={<CreateEditVacancie />}
                    />
                    <Route path="*" element={<NotFound404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
