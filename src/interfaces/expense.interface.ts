export interface Expense {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: 'food' | 'medical' | 'study' | 'travel' | 'entertainment' | 'gorcery' | 'investment' | 'rent' | 'attire' | 'salary' | 'other';
  comment?: string;
}
