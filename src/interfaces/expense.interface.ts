export interface Expense {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: 'food' | 'travel' | 'entertainment' | 'gorcery' | 'investment' | 'rent' | 'attire' | 'salary' | 'other';
  comment?: string;
}
