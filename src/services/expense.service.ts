import { Service } from 'typedi';
import { isValidObjectId } from 'mongoose';
import { HttpException } from '@exceptions/httpException';
import { ExpenseModel } from '@models/expense.modal';
import { Expense } from '@interfaces/expense.interface';

@Service()
export class ExpenseService {
  public async findAllExpenses(): Promise<Expense[]> {
    const expenses = await ExpenseModel.find().sort({ date: 'desc' }).exec();
    return expenses;
  }

  public async findExpenseById(id: string): Promise<Expense | null> {
    if (!isValidObjectId(id)) {
      throw new HttpException(409, "Record doesn't exist");
    }

    const expense = await ExpenseModel.findById(id).exec();
    return expense;
  }

  public async createExpense(expense: Expense): Promise<Expense> {
    const newExpense = new ExpenseModel(expense);
    const savedExpense = await newExpense.save();
    return savedExpense;
  }

  public async updateExpense(id: string, expense: Expense): Promise<Expense | null> {
    if (!isValidObjectId(id)) {
      throw new HttpException(409, "Record doesn't exist");
    }

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(id, expense, { new: true }).exec();
    return updatedExpense;
  }

  public async findExpenseByCategory(category: string): Promise<Expense[]> {
    const expenses = await ExpenseModel.find({ category }).exec();
    return expenses;
  }

  public async findExpenseByDate(startDate: Date, endDate: Date): Promise<Expense[]> {
    const expenses = await ExpenseModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).exec();
    return expenses;
  }

  public async deleteExpenseById(id: string): Promise<Expense> {
    if (!isValidObjectId(id)) {
      throw new HttpException(409, "Record doesn't exist");
    }

    const deletedExpense = await ExpenseModel.findByIdAndDelete(id).exec();
    return deletedExpense;
  }
}
