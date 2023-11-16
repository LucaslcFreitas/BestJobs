import { Router } from 'express';
import { GetAllStudyAreaController } from '../controllers/studyArea/GetAllStudyAreaController';
import { GetAllSectorsController } from '../controllers/sector/GetAllSectorsController';

const routes = Router();

//Study Areas
routes.get('/study_area', new GetAllStudyAreaController().handle);

//Sector
routes.get('/sector', new GetAllSectorsController().handle);

export { routes };
