import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Layouts
import DefaultLayout from '../layouts/DefaultLayout';

//Pages
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import CompanyHomepage from '../pages/company/CompanyHomepage';
import ProfileCompany from '../pages/company/ProfileCompany';
import MyVacancies from '../pages/company/MyVacancies';
import CreateEditVacancie from '../pages/company/CreateEditVacancie';
import CandidateHomepage from '../pages/candidate/CandidateHomepage';
import ProfileCandidate from '../pages/candidate/ProfileCandidate';
import CreateEditExperience from '../pages/candidate/CreateEditExperience';
import CreateEditGraduation from '../pages/candidate/CreateEditGraduation';
import MyCandidacy from '../pages/candidate/MyCandidacy';
import SearchVacancies from '../pages/candidate/SearchVacancies';
import Vacancie from '../pages/candidate/Vacancie';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/company" element={<CompanyHomepage />} />
                    <Route
                        path="/company/profile"
                        element={<ProfileCompany />}
                    />
                    <Route
                        path="/company/myvacancies"
                        element={<MyVacancies />}
                    />
                    <Route
                        path="/company/create"
                        element={<CreateEditVacancie />}
                    />
                    <Route
                        path="/company/edit/:id"
                        element={<CreateEditVacancie />}
                    />
                    <Route path="/candidate" element={<CandidateHomepage />} />
                    <Route
                        path="/candidate/profile"
                        element={<ProfileCandidate />}
                    />
                    <Route
                        path="/candidate/experience"
                        element={<CreateEditExperience />}
                    />
                    <Route
                        path="/candidate/experience/:id"
                        element={<CreateEditExperience />}
                    />
                    <Route
                        path="/candidate/graduation"
                        element={<CreateEditGraduation />}
                    />
                    <Route
                        path="/candidate/graduation/:id"
                        element={<CreateEditGraduation />}
                    />
                    <Route
                        path="/candidate/candidacy"
                        element={<MyCandidacy />}
                    />
                    <Route path="/vacancie" element={<SearchVacancies />} />
                    <Route path="/vacancie/:id" element={<Vacancie />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
