import { Router } from 'express';
import { verifyJWT } from '../middleware/authToken';
import { GetAllStudyAreaController } from '../controllers/studyArea/GetAllStudyAreaController';
import { GetAllSectorsController } from '../controllers/sector/GetAllSectorsController';
import { GetSkillController } from '../controllers/skill/GetSkillController';
import { GetAllJobTypesController } from '../controllers/jobTypes/GetAllJobTypesController';
import { GetAllTypeLocalitiesController } from '../controllers/typeLocality/GetAllTypeLocalitiesController';
import { CreateCandidateController } from '../controllers/candidate/CreateCandidateController';
import { LoginController } from '../controllers/candidate/LoginController';
import { GetMyCandidateController } from '../controllers/candidate/GetMyCandicateController';
import { UpdateCandidateController } from '../controllers/candidate/UpdateCandidateController';
import { CreateAcademicGraduationController } from '../controllers/AcademicGraduation/CreateAcademicGraduationController';
import { GetMyAcademicGraduationsController } from '../controllers/AcademicGraduation/GetMyAcademicGraduationsController';
import { UpdateAcademicGraduationController } from '../controllers/AcademicGraduation/UpdateAcademicGraduationController';
import { DeleteAcademicGraduationController } from '../controllers/AcademicGraduation/DeleteAcademicGraduationController';
import { CreateExperienceController } from '../controllers/Experience/CreateExperienceController';
import { GetMyExperienceController } from '../controllers/Experience/GetMyExperienceController';
import { DeleteExperienceController } from '../controllers/Experience/DeleteExperienceController';
import { UpdateExperienceGraduation } from '../controllers/Experience/UpdateExperienceController';

const routes = Router();

//PRIVATE ROUTES
//Candidate
routes.get('/candidate/my', verifyJWT, new GetMyCandidateController().handle);
routes.put('/candidate', verifyJWT, new UpdateCandidateController().handle);

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
routes.post('/candidate/login', new LoginController().handle);

export { routes };
