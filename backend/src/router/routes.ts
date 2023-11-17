import { Router } from 'express';
import { GetAllStudyAreaController } from '../controllers/studyArea/GetAllStudyAreaController';
import { GetAllSectorsController } from '../controllers/sector/GetAllSectorsController';
import { GetSkillController } from '../controllers/skill/GetSkillController';
import { GetAllJobTypesController } from '../controllers/jobTypes/GetAllJobTypesController';
import { GetAllTypeLocalitiesController } from '../controllers/typeLocality/GetAllTypeLocalitiesController';
import { CreateCandidateController } from '../controllers/candidate/CreateCandidateController';
import { LoginController } from '../controllers/candidate/LoginController';
import { GetMyCandidateController } from '../controllers/candidate/GetMyCandicateController';

import { verifyJWT } from '../middleware/authToken';
import { UpdateCandidateController } from '../controllers/candidate/UpdateCandidateController';

const routes = Router();

//PRIVATE ROUTES
//Candidate
routes.get('/candidate/my', verifyJWT, new GetMyCandidateController().handle);
routes.put('/candidate', verifyJWT, new UpdateCandidateController().handle);

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
