import { Router } from 'express';
import { verifyJWT } from '../middleware/authToken';
import { GetAllStudyAreaController } from '../controllers/studyArea/GetAllStudyAreaController';
import { GetAllSectorsController } from '../controllers/sector/GetAllSectorsController';
import { GetSkillController } from '../controllers/skill/GetSkillController';
import { GetAllJobTypesController } from '../controllers/jobTypes/GetAllJobTypesController';
import { GetAllTypeLocalitiesController } from '../controllers/typeLocality/GetAllTypeLocalitiesController';
import { CreateCandidateController } from '../controllers/candidate/CreateCandidateController';
import { LoginCandidateController } from '../controllers/candidate/LoginCandidateController';
import { GetMyCandidateController } from '../controllers/candidate/GetMyCandicateController';
import { UpdateCandidateController } from '../controllers/candidate/UpdateCandidateController';
import { CreateAcademicGraduationController } from '../controllers/academicGraduation/CreateAcademicGraduationController';
import { GetMyAcademicGraduationsController } from '../controllers/academicGraduation/GetMyAcademicGraduationsController';
import { UpdateAcademicGraduationController } from '../controllers/academicGraduation/UpdateAcademicGraduationController';
import { DeleteAcademicGraduationController } from '../controllers/academicGraduation/DeleteAcademicGraduationController';
import { CreateExperienceController } from '../controllers/experience/CreateExperienceController';
import { GetMyExperienceController } from '../controllers/experience/GetMyExperienceController';
import { DeleteExperienceController } from '../controllers/experience/DeleteExperienceController';
import { UpdateExperienceGraduation } from '../controllers/experience/UpdateExperienceController';
import { CreateCompanyController } from '../controllers/company/CreateCompanyController';
import { LoginCompanyController } from '../controllers/company/LoginCompanyController';
import { GetMyCompanyController } from '../controllers/company/GetMyCompanyController';
import { UpdateCompanyController } from '../controllers/company/UpdateCompanyController';
import { CreateVacancieController } from '../controllers/vacancie/CreateVacancieController';
import { GetMyVacancieController } from '../controllers/vacancie/GetMyVacancieController';
import { DeleteVacancieController } from '../controllers/vacancie/DeleteVacancieController';
import { UpdateVacancieController } from '../controllers/vacancie/UpdateVacancieController';
import { GetVacancieController } from '../controllers/vacancie/GetVacancieController';
import { SearchVacancieController } from '../controllers/vacancie/SearchVacancieController';
import { CreateCandidacyController } from '../controllers/candidacy/CreateCandidacyController';
import { DeleteCandidacyController } from '../controllers/candidacy/DeleteCandidacyController';
import { ApproveCandidacyController } from '../controllers/candidacy/ApproveCandidacyController';
import { DisapproveCandidacyController } from '../controllers/candidacy/DesapproveCandidacyController';
import { GetMyCandidaciesController } from '../controllers/candidacy/GetMyCandidaciesController';
import { GetCandidateController } from '../controllers/candidate/GetCandidateController';

const routes = Router();

//PRIVATE ROUTES
//Candidate
routes.get('/candidate/my', verifyJWT, new GetMyCandidateController().handle);
routes.put('/candidate', verifyJWT, new UpdateCandidateController().handle);
routes.get('/candidate/:id', verifyJWT, new GetCandidateController().handle);

//Academic Graduation
routes.post(
    '/graduation',
    verifyJWT,
    new CreateAcademicGraduationController().handle
);
routes.get(
    '/graduation/my',
    verifyJWT,
    new GetMyAcademicGraduationsController().handle
);
routes.put(
    '/graduation/:id',
    verifyJWT,
    new UpdateAcademicGraduationController().handle
);
routes.delete(
    '/graduation/:id',
    verifyJWT,
    new DeleteAcademicGraduationController().handle
);

//Experience
routes.post('/experience', verifyJWT, new CreateExperienceController().handle);
routes.get('/experience/my', verifyJWT, new GetMyExperienceController().handle);
routes.put(
    '/experience/:id',
    verifyJWT,
    new UpdateExperienceGraduation().handle
);
routes.delete(
    '/experience/:id',
    verifyJWT,
    new DeleteExperienceController().handle
);

//Company
routes.get('/company/my', verifyJWT, new GetMyCompanyController().handle);
routes.put('/company', verifyJWT, new UpdateCompanyController().handle);

//Vacancie
routes.post('/vacancie', verifyJWT, new CreateVacancieController().handle);
routes.get('/vacancie/my', verifyJWT, new GetMyVacancieController().handle);
routes.get('/vacancie/:id', verifyJWT, new GetVacancieController().handle);
routes.get('/vacancie', verifyJWT, new SearchVacancieController().handle);
routes.delete(
    '/vacancie/:id',
    verifyJWT,
    new DeleteVacancieController().handle
);
routes.put('/vacancie/:id', verifyJWT, new UpdateVacancieController().handle);

//Candidacy
routes.post('/candidacy', verifyJWT, new CreateCandidacyController().handle);
routes.delete(
    '/candidacy/:id',
    verifyJWT,
    new DeleteCandidacyController().handle
);
routes.get('/candidacy/my', verifyJWT, new GetMyCandidaciesController().handle);
routes.put(
    '/candidacy/approve/:id',
    verifyJWT,
    new ApproveCandidacyController().handle
);
routes.put(
    '/candidacy/disapprove/:id',
    verifyJWT,
    new DisapproveCandidacyController().handle
);

//PUBLIC ROUTES
//Study Area
routes.get('/study_area', new GetAllStudyAreaController().handle);

//Sector
routes.get('/sector', new GetAllSectorsController().handle);

//Skill
routes.get('/skill', new GetSkillController().handle);

//Job Type
routes.get('/job_type', new GetAllJobTypesController().handle);

//Type Locality
routes.get('/type_locality', new GetAllTypeLocalitiesController().handle);

//Candidate
routes.post('/candidate', new CreateCandidateController().handle);
routes.post('/candidate/login', new LoginCandidateController().handle);

//Company
routes.post('/company', new CreateCompanyController().handle);
routes.post('/company/login', new LoginCompanyController().handle);

export { routes };
