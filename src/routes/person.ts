import { Router } from 'express';
import personController from '../controllers/person';

const router = Router();

router.get('/', personController.getPersons);

export default router;