import { Router } from 'express';
import { GetAllStudyAreaController } from '../controllers/studyArea/GetAllStudyAreaController';
import { GetAllSectorsController } from '../controllers/sector/GetAllSectorsController';
import { GetSkillController } from '../controllers/skill/GetSkillController';
import { GetAllJobTypesController } from '../controllers/jobTypes/GetAllJobTypesController';

const routes = Router();

//Study Areas
routes.get('/study_area', new GetAllStudyAreaController().handle);

//Sector
routes.get('/sector', new GetAllSectorsController().handle);

//Skill
routes.get('/skill', new GetSkillController().handle);

//JobTypes
routes.get('/job_types', new GetAllJobTypesController().handle);

export { routes };
