import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Expense } from '@interfaces/expense.interface';
import { RequestWithUser } from '@interfaces/requestWithUser.interface';
import { ExpenseService } from './../services/expense.service';

export class ExpenseController {
  public expenseService = Container.get(ExpenseService);

  public getExpenses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const findAllExpenseData: Expense[] = await this.expenseService.findAllExpenses(userId);
      const totalExpenseAmount = findAllExpenseData.reduce((total, item) => total + item.amount, 0);
      res.status(200).json({ data: [...findAllExpenseData, { totalExpenseAmount }], message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId: string = req.params.id;
      const findOneExpenseData: Expense = await this.expenseService.findExpenseById(expenseId);
      res.status(200).json({ data: findOneExpenseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id; // get user ID from JWT token
      const expenseData: Expense = req.body;
      const newExpenseData = { ...expenseData, date: new Date(expenseData.date).toUTCString() };
      const createExpenseData: Expense = await this.expenseService.createExpense({ ...newExpenseData, user: userId });
      res.status(201).json({ data: createExpenseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId: string = req.params.id;
      const expenseData: Expense = req.body;
      const updateExpenseData: Expense = await this.expenseService.updateExpense(expenseId, expenseData);
      res.status(200).json({ data: updateExpenseData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId: string = req.params.id;
      const deleteExpenseData: Expense = await this.expenseService.deleteExpenseById(expenseId);
      res.status(200).json({ data: deleteExpenseData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getExpenseByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category: string = req.params.category;
      const expenseDataByCategory: Expense[] = await this.expenseService.findExpenseByCategory(category);
      res.status(200).json({ data: expenseDataByCategory, message: 'find by category' });
    } catch (error) {
      next(error);
    }
  };

  public getExpenseByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startDate: Date = new Date(req.params.startDate);
      const endDate: Date = new Date(req.params.endDate);
      const expenseDataByDate: Expense[] = await this.expenseService.findExpenseByDate(startDate, endDate);
      res.status(200).json({ data: expenseDataByDate, message: 'find by date' });
    } catch (error) {
      next(error);
    }
  };
}
