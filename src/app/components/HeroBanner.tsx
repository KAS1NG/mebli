import styles from '@/app/styles/HeroBanner.module.scss';

const HeroBanner = () => (
    <div className={styles.hero}>
        <div className={styles.board}>
            <h1>Discover Modern Comfort</h1>
            <button>Shop Now</button>
        </div>
    </div>
);

export default HeroBanner;
