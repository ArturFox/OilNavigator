//src/pages/wallet/ui/WalletPage.tsx

import { Calendar, CardSim, Check, Delete, Divide, Minus, Plus, VenetianMaskIcon, X } from 'lucide-react';
import styles from '../../../styles/blocks/wallet.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Decimal from "decimal.js";
import { categoriestTotalSum, incomeTotalSum } from '../../../entities/wallets/model/selectors/wallets';
import { useGetCategoriesQuery, useGetEarningsQuery, useGetExpensesQuery, useGetIncomeQuery } from '../../../entities/wallets/api/getWallets';
import type { CategoriesDto } from '../../../entities/wallets/types/wallets.dto';
import type { RootState } from '../../../app/store/store';

export function WalletPage() {

  const [flag, setFlag] = useState<boolean>(true);
  const [oneCategori, setOneCategory] = useState<boolean>(false);
  const [clickApiDataCategories, setClickApiDataCategories] = useState<null | CategoriesDto>(null)
  const [currentValue, setCurrentValue] = useState<string >('');
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  
  console.log(`stored - ${storedValue}`)
  console.log(`operator - ${operator}`)
  console.log(`current - ${currentValue}`)

  const selectedDate: string = useSelector((state: RootState) => state.date.day);

  const onlyYearAndMonth: string = selectedDate.split('-').slice(0, 2).join('-');

  const { data: categories, isLoading: isCatLoading } = useGetCategoriesQuery();
  const { isLoading: isExpLoading } = useGetExpensesQuery(onlyYearAndMonth);
  const { data: income, isLoading: isIncomeLoading } = useGetIncomeQuery();
  const { isLoading: isEarningsLoading } = useGetEarningsQuery(onlyYearAndMonth);

  const f = useSelector(categoriestTotalSum(onlyYearAndMonth));
  const g = useSelector(incomeTotalSum(onlyYearAndMonth));

  if (isCatLoading || isExpLoading || isIncomeLoading || isEarningsLoading) return <div>Loading...</div>;

  function clickCategory (clickDataCategory: CategoriesDto) {
    setOneCategory(!oneCategori)
    setClickApiDataCategories(clickDataCategory)
  }

  function appendDigit(digit: string) {

    setCurrentValue(prev => {

      if (prev === '0') {
        return digit;
      }

      return prev + digit;
    });
  }

  function removeLast() {

    if (currentValue !== '0') {

      setCurrentValue(prev => {
        if (prev.length <= 1) return '0';
        return prev.slice(0, -1);
      });

      return;
    }

    if (operator) {
      setOperator(null);
      return;
    }

    if (storedValue) {
      setStoredValue(null);
    }
  }

  function addDot() {

    setCurrentValue(prev => {

      if (prev.includes('.')) {
        return prev;
      }

      return prev + '.';
    });
  }

  function clearAll () {

    setOneCategory(false);

    setCurrentValue('0');
    setStoredValue(null);
    setOperator(null);
  }

  function appendOperator(nextOperator: string) {

    // меняем оператор
    if (currentValue === '0' && storedValue !== null) {
      setOperator(nextOperator);
      return;
    }

    // первый оператор
    if (storedValue === null) {

      setStoredValue(currentValue);
      setCurrentValue('0');
      setOperator(nextOperator);

      return;
    }

    // вычисление
    if (operator) {

      const result = calculate(
        storedValue,
        currentValue,
        operator
      );

      setStoredValue(result);
      setCurrentValue('0');
      setOperator(nextOperator);
    }
  }

  function calculate ( a: string, b: string, op: string): string {

    const first = new Decimal(a);
    const second = new Decimal(b);

    switch (op) {
      case '+':
        return first.plus(second).toString();

      case '-':
        return first.minus(second).toString();

      case '*':
        return first.times(second).toString();

      case '/':
        if (second.equals(0)) {
          return '0';
        }
        return first.div(second).toString();

      default:
        return b;
    }
  }

  function handleEqual () {

    if (!operator || storedValue === null) return;

    const result = calculate(
      storedValue,
      currentValue,
      operator
    );

    setCurrentValue(result);

    setStoredValue(null);
    setOperator(null);
  }

  return (

    <main className={styles["main"]}>
      
      {flag ? (
        categories?.map((e, index) => {

          const spent = f.get(e.id) || 0;
          const budget = e.budget || 1;
          const percent = Math.min((spent / budget) * 100, 100);

          return (
            <div
              key={e.id || index}
              className={`${styles["main__block"]} ${styles[`main__block--${index + 1}`]}`}
              onClick={() => clickCategory(e)}
            >
              <div className={styles["main__text"]}>
                {e.name}
              </div>

              <div className={styles["main__text"]}>
                {e.budget} Р
              </div>

              <div
                className={styles["main__circle"]}
                style={{
                  background: `linear-gradient(to top, ${e.color} ${percent}%)`
                }}
              >
                <VenetianMaskIcon />
              </div>

              <div className={styles["main__text"]}>
                {f.get(e.id) ?? '0'}
              </div>
            </div>
          );
        })
      ) : (
        income?.map((e, index) => {

          return (
            <div
              key={e.id || index}
              className={`${styles["main__block"]} ${styles[`main__block--${index + 1}`]}`}
            >
              <div className={styles["main__text"]}>
                {e.name}
              </div>

              <div className={styles["main__text"]}>
                 Р
              </div>

              <div
                className={styles["main__circle"]}
              >
                <VenetianMaskIcon />
              </div>

              <div className={styles["main__text"]}>
                {g.get(e.id) ?? '0'}
              </div>
            </div>
          );
        })
      )}

      <div 
        className={styles['main__enter-chart']}
        onClick={() => setFlag(!flag)}
      >

        <div className={styles['circle']}>

            <span>{oneCategori ? 'Доходы' : 'Расходы'}</span>
            <span>0 Р</span>
        
        </div>

      </div>

      {oneCategori && (

        <div 
          className={styles['main__openCategori']}
          onClick={() => clearAll()}
        >

          <div 
            className={styles['main__modal']}
            onClick={(e) => e.stopPropagation()}
          >

            <div className={styles['main__modal__category']}>

              <div 
                className={styles['main__modal__category__divCategory']}
                style={{ backgroundColor: clickApiDataCategories?.color }}
              >

                <p className={styles['main__modal__category__divCategory__pCategory']}>
                  На категорию
                </p>

                <p className={styles['main__modal__category__divCategory__pCategory']}>
                  {clickApiDataCategories?.name ?? ''}
                </p>

                <CardSim  className={styles['main__modal__category__divCategory__lucideReact']}/>

              </div>

            </div>

            <div className={styles['main__modal__income']}>
              
              <p className={styles['main__modal__income__pIncome']}>
                Расход
              </p>

              <p 
                className={styles['main__modal__income__pNumber']}
                style={{ color: clickApiDataCategories?.color }}
              >
                {

                  storedValue && operator && currentValue
                    ? `${storedValue} ${operator} ${currentValue !== '0' ? currentValue : ''}`
                    : storedValue && operator
                      ? `${storedValue} ${operator}`
                      : currentValue && currentValue !== '0'
                        ? `${currentValue}`
                        : storedValue
                          ? `${storedValue}`
                          : ''
                } ₽
              </p>

            </div>

            <div className={styles['main__modal__notes']}>

              <textarea
                className={styles['main__modal__notes__textarea']}
                placeholder='Заметки...'
              />
              
            </div>

            <div className={styles['main__modal__calculator']}>
  
              <button 
                className={styles['main__modal__calculator__c1']}
                onClick={() => appendOperator('/')}
              >
                <Divide/>
              </button>

              <button 
                className={styles['main__modal__calculator__c2']}
                onClick={() => appendDigit('7')}
              >
                7
              </button>

              <button 
                className={styles['main__modal__calculator__c3']}
                onClick={() => appendDigit('8')}
              >
                8
              </button>

              <button 
                className={styles['main__modal__calculator__c4']}
                onClick={() => appendDigit('9')}
              >
                9
              </button>

              <button  
                className={styles['main__modal__calculator__c5']}
                onClick={() => removeLast()}
              >
                <Delete/>
              </button>

              <button 
                className={styles['main__modal__calculator__c6']}
                onClick={() => appendOperator('*')}
              >
                <X/>
              </button>

              <button 
                className={styles['main__modal__calculator__c7']}
                onClick={() => appendDigit('4')}
              >
                4
              </button>

              <button  
                className={styles['main__modal__calculator__c8']}
                onClick={() => appendDigit('5')}
              >
                5
              </button>

              <button   
                className={styles['main__modal__calculator__c9']}
                onClick={() => appendDigit('6')}
              >
                6
              </button>

              <button className={styles['main__modal__calculator__c10']}>
                <Calendar/>
              </button>

              <button 
                className={styles['main__modal__calculator__c11']}
                onClick={() => appendOperator('-')}
              >
                <Minus/>
              </button>

              <button 
                className={styles['main__modal__calculator__c12']}
                onClick={() => appendDigit('1')}
              >
                1
              </button>

              <button 
                className={styles['main__modal__calculator__c13']}
                onClick={() => appendDigit('2')}
              >
                2
              </button>

              <button 
                className={styles['main__modal__calculator__c14']}
                onClick={() => appendDigit('3')}
              >
                3
              </button>

              <button 
                className={styles['main__modal__calculator__ch']}
                style={{ backgroundColor: clickApiDataCategories?.color }}
                onClick={() => handleEqual()}
              >
                <Check/>
              </button>

              <button 
                className={styles['main__modal__calculator__c15']}
                onClick={() => appendOperator('+')}
              >
                <Plus/>
              </button>

              <button className={styles['main__modal__calculator__c16']}>
                ₽
              </button>

              <button 
                className={styles['main__modal__calculator__c17']}
                onClick={() => appendDigit('0')}
              >
                0
              </button>

              <button 
                className={styles['main__modal__calculator__c18']}
                onClick={() => addDot()}
              >
                .
              </button>

            </div>

            
          </div>

        </div>

      )}

    </main>
  );
}
