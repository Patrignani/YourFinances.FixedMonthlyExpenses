import * as fixedMonthlyExpensesController from '../controllers/fixed-monthly-expense-controller'
import * as express from "express";

const router = express.Router();

router.post('/', fixedMonthlyExpensesController.Post);
router.get('/', fixedMonthlyExpensesController.GetAll);
router.get('/:id', fixedMonthlyExpensesController.GetById);
router.delete('/:id',fixedMonthlyExpensesController.Delete);
router.put('/ActiveInactive/:id',fixedMonthlyExpensesController.ActiveInactive);
router.put('/:id',fixedMonthlyExpensesController.Update);

export default router;