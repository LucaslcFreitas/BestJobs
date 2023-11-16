import { Router } from 'express';
import { GetAllStudyAreaController } from '../controllers/studyArea/GetAllStudyAreaController';

const routes = Router();

//Study Areas
routes.get('/study_area', new GetAllStudyAreaController().handle);

export { routes };
