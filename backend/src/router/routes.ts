import { Router } from 'express';
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

import { verifyJWT } from '../middleware/authToken';
import { GetMyAcademicGraduationsController } from '../controllers/AcademicGraduation/GetMyAcademicGraduationsController';
import { UpdateAcademicGraduationController } from '../controllers/AcademicGraduation/UpdateAcademicGraduationController';
import { DeleteAcademicGraduationController } from '../controllers/AcademicGraduation/DeleteAcademicGraduationController';

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
