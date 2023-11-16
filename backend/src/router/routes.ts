import { Router } from 'express';
import { GetAllStudyAreaController } from '../controllers/studyArea/GetAllStudyAreaController';
import { GetAllSectorsController } from '../controllers/sector/GetAllSectorsController';
import { GetSkillController } from '../controllers/skill/GetSkillController';
import { GetAllJobTypesController } from '../controllers/jobTypes/GetAllJobTypesController';
import { GetAllTypeLocalitiesController } from '../controllers/typeLocality/GetAllTypeLocalitiesController';

const routes = Router();

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

export { routes };
