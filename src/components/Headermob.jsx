import { Link } from "react-router-dom"
import styles from '../styles/Headermob.module.css'
import { useState, useRef, useEffect } from "react"
import sun from '../assets/sun.png'
import moon  from '../assets/moon.png'
import logo from '../assets/logo.svg'
import logoDark from '../assets/logo-dark.svg'
import menu from '../assets/menu.png'
import menuWhite from '../assets/menu-white.png'

export default function Headermob({theme, chTheme, cnt}) {
    const [drop, setDrop] = useState(false);

    const dropRef = useRef(null)

    const handleDrop = () => {
        setDrop(!drop);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setDrop(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <nav className={styles.nav + " " + (theme==="light" ? styles.light : styles.dark)}>
            <Link to="/" className={styles.shopLink}>
                <div className={styles.shopeasy}>
                    {theme==="light" ? <img src={logo} alt="shop easy" /> : <img src={logoDark} alt="shop easy"/>}
                    <h1 className={styles.title}>ShopEasy</h1>
                </div>
            </Link>
            <div className={styles.buttons}>
                <button className={styles.themeBut} onClick={chTheme}>
                    {theme==="light" ? <img src={sun} alt="light theme" /> : <img src={moon} alt="dark theme"/>}
                </button>
                <div className={styles.products} onClick={handleDrop} ref={dropRef}>
                    <button className={styles.menuBut}>
                        {theme==="light" ? <img src={menu} alt="menu"/> : <img src={menuWhite} alt="menu"/>}
                    </button>
                    <div className={styles.links + " " + (drop && styles.visible) + " " + (theme==="light" ? styles.litDrop : styles.darkDrop) }>
                        <div className={styles.homeLink}>
                            <Link to="/" className={styles.home + " " + (theme==="light" ? styles.litH : styles.darkH)}>Home</Link>
                        </div>
                        <div className={styles.prodName}>Products</div>
                        <ul className={styles.prodList}>
                            <li className={styles.prodLink}>
                                <Link to="tv" className={theme==="light" ? styles.litLink : styles.darkLink}>Televisions</Link>
                            </li>
                            <li className={styles.prodLink}>
                                <Link to="laptop" className={theme==="light" ? styles.litLink : styles.darkLink}>Laptops</Link>
                            </li>
                            <li className={styles.prodLink}>
                                <Link to="mobile" className={theme==="light" ? styles.litLink : styles.darkLink}>Smartphones</Link>
                            </li>
                            <li className={styles.prodLink}>
                                <Link to="gaming" className={theme==="light" ? styles.litLink : styles.darkLink}>Gaming</Link>
                            </li>
                        </ul>
                        <div className={styles.cart}>
                            <Link to="cart" className={styles.cartCnt + " " + (theme==="light" ? styles.cartL : styles.cartD)}>{"In Cart: " + cnt}</Link>
                        </div>
                    </div>
                </div>
            </div>    
        </nav>
        
    )
}