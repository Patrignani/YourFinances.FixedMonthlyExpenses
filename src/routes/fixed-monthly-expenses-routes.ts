import * as fixedMonthlyExpensesController from '../controllers/fixed-monthly-expenses-controller'
import * as express from "express";

const router = express.Router();

router.post('/', fixedMonthlyExpensesController.Post);
//router.get('/', cashFlowGroupingController.GetAll);
router.get('/:id', fixedMonthlyExpensesController.GetById);
//router.delete('/:id',cashFlowGroupingController.Delete);
//router.put('/ActiveInactive/:id',cashFlowGroupingController.ActiveInactive);
//router.put('/:id',cashFlowGroupingController.Update);

export default router;