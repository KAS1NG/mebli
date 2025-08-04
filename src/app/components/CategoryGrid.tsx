import styles from '@/app/styles/CategoryGrid.module.scss';

const categories = ['Sofas', 'Beds', 'Tables', 'Chairs'];

const CategoryGrid = () => (
  <div className={styles.grid}>
    {categories.map((category) => (
      <div key={category} className={styles.card}>
        <h3>{category}</h3>
      </div>
    ))}
  </div>
);

export default CategoryGrid;
