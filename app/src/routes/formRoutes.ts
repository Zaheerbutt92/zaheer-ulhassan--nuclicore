import express from 'express';
import controller from '../controllers/formsController';
const router = express.Router();

router.get('/forms', controller.getForms);
router.get('/forms/:id', controller.getForm);
router.post('/forms', controller.addForm);
router.put('/forms/:id', controller.updateForm);
router.delete('/forms/:id', controller.deleteForm);

export = router;