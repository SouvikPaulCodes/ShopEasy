import { useOutletContext } from "react-router-dom"
import styles from '../styles/Home.module.css'
import { Link } from "react-router-dom";

export default function Home() {
    const [theme, cart, increaseCart, decreaseCart] = useOutletContext();

    console.log(theme)

    return (
        <main className={theme==="light" ? styles.litMain : styles.darkMain}>
            <div className={styles.intro}>
                <div className={styles.inHead}>
                    TAKE YOUR ELECTRO-STYLE TO THE NEXT LEVEL!
                </div>
                <div className={styles.subText}>Browse through our collection and choose what fits you best ↓↓↓</div>
            </div>
            <div className={styles.explore}>
                <h1 className={styles.expHead}>
                    <div className={styles.arrow}>↓</div> {' '}
                    <div className={styles.expText}>Explore Our Varied Collection</div> {' '}
                    <div className={styles.arrow}>↓</div>
                </h1>
                <div className={styles.cards}>
                    <div className={styles.linkCard + " " + styles.tv}>
                        <Link to="tv" className={styles.cardLink}>Televisions</Link>
                    </div>
                    <div className={styles.linkCard + " " + styles.laptop}>
                        <Link to="laptop" className={styles.cardLink}>Laptops</Link>
                    </div>
                    <div className={styles.linkCard + " " + styles.mobile}>
                        <Link to="mobile" className={styles.cardLink}>Smartphones</Link>
                    </div>
                    <div className={styles.linkCard + " " + styles.gaming}>
                        <Link to="gaming" className={styles.cardLink}>Gaming</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}