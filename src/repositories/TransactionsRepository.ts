/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (total: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            total.income += transaction.value;
            total.total += transaction.value;
            break;

          case 'outcome':
            total.outcome += transaction.value;
            total.total -= transaction.value;
            break;

          default:
            break;
        }

        return total;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
