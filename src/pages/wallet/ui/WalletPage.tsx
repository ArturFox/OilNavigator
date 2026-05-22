
//import { useSelector } from 'react-redux';
import { VenetianMaskIcon } from 'lucide-react';
import { useGetCategoriesQuery, useGetExpensesQuery } from '../../../api/wallet/wallet.api';
import styles from '../../../styles/blocks/wallet.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/new-store';
import { categoriestTotalSum } from '../../../api/wallet/wallet.select';
//import { categoriesMap, expensesMap } from '../../../api/wallet/wallet.select';

export function WalletPage() {

  const selectedDate = useSelector((state: RootState) => state.date.day);

  const { data: categories, isLoading: isCatLoading } = useGetCategoriesQuery();
  const { data: expenses, isLoading: isExpLoading } = useGetExpensesQuery(selectedDate);

  const f = useSelector(categoriestTotalSum(selectedDate))

  console.log(expenses)

  if (isCatLoading || isExpLoading) return <div>Loading...</div>;

  return (
    <main className={styles["main"]}>
      
      {categories?.map((e, index) => {

        const spent = f.get(e.id) || 0;
        const budget = e.budget || 1; // защита от деления на 0
        const percent = Math.min((spent / budget) * 100, 100); // не больше 100%
        const color = e.color || 'gray';
        
        return (
          
          <div 
            key={e.id || index} 
            className={`${styles["main__block"]} ${styles[`main__block--${index + 1}`]}`}
          >

            <div className={styles["main__text"]}>
              {e.name}
            </div>

            <div className={styles["main__text"]}>
              {e.budget} Р
            </div>

            <div 
              className={styles['main__circle']} 
              style={{
                background: `linear-gradient(to top, blue ${percent}%, #333 90%)`
              }}
            >

            <VenetianMaskIcon/>

            </div>

            <div className={styles["main__text"]}>
              {f.get(e.id) ?? '0'}
            </div>
        
          </div>
        )

      })}

      <div className={styles['main__enter-chart']}>

        <div className={styles['circle']}>

            <span>Расходы</span>
            <span>0 Р</span>
        
        </div>

      </div>

    </main>
  );
}
