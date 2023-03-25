import { Router } from 'express';
import { ExpenseController } from '@controllers/expense.controller';
import { ExpenseDto } from '@dtos/expense.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class ExpenseRoute implements Routes {
  public path = '/expense';
  public router = Router();
  public expense = new ExpenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.expense.getExpenses);
    this.router.get(`${this.path}/:id`, this.expense.getExpenseById);
    this.router.get(`${this.path}/filter/:category`, this.expense.getExpenseByCategory);
    this.router.get(`${this.path}/filter/:startDate/:endDate`, this.expense.getExpenseByDate);
    this.router.post(`${this.path}`, ValidationMiddleware(ExpenseDto), this.expense.createExpense);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(ExpenseDto, true), this.expense.updateExpense);
    this.router.delete(`${this.path}/:id`, this.expense.deleteExpenseById);
  }
}
