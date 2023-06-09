import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDateString } from 'class-validator';

enum Category {
  FOOD = 'food',
  MEDICAL = 'medical',
  STUDY = 'study',
  TRAVEL = 'travel',
  ENTERTAINMENT = 'entertainment',
  GROCERY = 'grocery',
  INVESTMENT = 'investment',
  RENT = 'rent',
  ATTIRE = 'attire',
  SALARY = 'salary',
  OTHER = 'other',
}

export class ExpenseDto {
  @IsNotEmpty()
  @IsNumber()
  public amount: number;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @IsNotEmpty()
  @IsEnum(Category)
  public category: Category;

  @IsString()
  comment: string;
}
