import mongoose, { model, Schema, Document } from 'mongoose';
import { Expense } from '@interfaces/expense.interface';

const ExpenseSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['food', 'travel', 'entertainment', 'grocery', 'investment', 'rent', 'attire', 'salary', 'other'],
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const ExpenseModel = model<Expense & Document>('Expense', ExpenseSchema);
