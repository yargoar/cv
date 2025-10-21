import styles from './EasterEgg.module.css';

interface Props {
    isVisible: boolean;
}

const EasterEgg = ({ isVisible }: Props) => {
    if (!isVisible) return null;

    return (
        <div className={styles.container}>
            <div className={`${styles.frog} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.head}>
                    <div className={styles.tophead}>
                        <div className={`${styles['eye-circle']} ${styles['eye-circle-left']}`}>
                            <div className={`${styles.eye} ${styles['eye-left']}`}>
                                <div className={styles.pupil}>
                                    <div className={styles['eye-shine']}></div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['eye-circle']} ${styles['eye-circle-right']}`}>
                            <div className={`${styles.eye} ${styles['eye-right']}`}>
                                <div className={styles.pupil}>
                                    <div className={styles['eye-shine']}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mouth}></div>
                    <div className={`${styles.nostril} ${styles['nostril-left']}`}></div>
                    <div className={`${styles.nostril} ${styles['nostril-right']}`}></div>
                    <div className={`${styles.spot} ${styles.spot2}`}></div>
                </div>

                <div className={styles.body}>
                    <div className={styles['body-background']}>
                        <div className={`${styles.spot} ${styles.spot1}`}></div>
                    </div>
                    <div className={`${styles['back-leg']} ${styles['back-leg-left']}`}></div>
                    <div className={`${styles['back-foot']} ${styles['back-foot-left']}`}>
                        <div className={styles.finger}></div>
                    </div>
                    <div className={`${styles['back-leg']} ${styles['back-leg-right']}`}></div>
                    <div className={`${styles['back-foot']} ${styles['back-foot-right']}`}>
                        <div className={styles.finger}></div>
                    </div>

                    <div className={`${styles['front-leg']} ${styles['front-leg-left']}`}></div>
                    <div className={`${styles['front-foot']} ${styles['front-foot-left']}`}>
                        <div className={styles.finger}></div>
                    </div>
                    <div className={`${styles['front-leg']} ${styles['front-leg-right']}`}></div>
                    <div className={`${styles['front-foot']} ${styles['front-foot-right']}`}>
                        <div className={styles.finger}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EasterEgg;
