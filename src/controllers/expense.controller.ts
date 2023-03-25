import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Expense } from '@interfaces/expense.interface';
import { ExpenseService } from './../services/expense.service';

export class ExpenseController {
  public expense = Container.get(ExpenseService);

  public getExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllExpenseData: Expense[] = await this.expense.findAllExpenses();

      res.status(200).json({ data: findAllExpenseData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId: string = req.params.id;
      const findOneExpenseData: Expense = await this.expense.findExpenseById(expenseId);
      res.status(200).json({ data: findOneExpenseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseData: Expense = req.body;
      const createExpenseData: Expense = await this.expense.createExpense(expenseData);
      res.status(201).json({ data: createExpenseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId: string = req.params.id;
      const expenseData: Expense = req.body;
      const updateExpenseData: Expense = await this.expense.updateExpense(expenseId, expenseData);
      res.status(200).json({ data: updateExpenseData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId: string = req.params.id;
      const deleteExpenseData: Expense = await this.expense.deleteExpenseById(expenseId);
      res.status(200).json({ data: deleteExpenseData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getExpenseByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category: string = req.params.category;
      const expenseDataByCategory: Expense[] = await this.expense.findExpenseByCategory(category);
      res.status(200).json({ data: expenseDataByCategory, message: 'find by category' });
    } catch (error) {
      next(error);
    }
  };

  public getExpenseByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startDate: Date = new Date(req.params.startDate);
      const endDate: Date = new Date(req.params.endDate);
      const expenseDataByDate: Expense[] = await this.expense.findExpenseByDate(startDate, endDate);
      res.status(200).json({ data: expenseDataByDate, message: 'find by date' });
    } catch (error) {
      next(error);
    }
  };
}
