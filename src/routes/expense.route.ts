import { Router } from 'express';
import { ExpenseController } from '@controllers/expense.controller';
import { ExpenseDto } from '@dtos/expense.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class ExpenseRoute implements Routes {
  public path = '/expense';
  public router = Router();
  public expenseController = new ExpenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.expenseController.getExpenses);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.expenseController.getExpenseById);
    this.router.get(`${this.path}/filter/:category`, AuthMiddleware, this.expenseController.getExpenseByCategory);
    this.router.get(`${this.path}/filter/:startDate/:endDate`, AuthMiddleware, this.expenseController.getExpenseByDate);
    this.router.post(`${this.path}`, ValidationMiddleware(ExpenseDto), AuthMiddleware, this.expenseController.createExpense);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(ExpenseDto, true), AuthMiddleware, this.expenseController.updateExpense);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.expenseController.deleteExpenseById);
  }
}
