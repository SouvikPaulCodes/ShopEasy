import { Link } from "react-router-dom"
import styles from '../styles/Header.module.css'
import { useState, useRef, useEffect } from "react"
import logo from '../assets/logo.svg'
import logoDark from '../assets/logo-dark.svg'
import dropdown from '../assets/dropdown.png'
import dropdownWhite from '../assets/dropdown-white.png'
import sun from '../assets/sun.png'
import moon  from '../assets/moon.png'
import cart from '../assets/cart.png'
import cartWhite from '../assets/cart-white.png'

export default function Header({theme, chTheme, cnt}) {
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
                <Link to="/" className={styles.home + " " + (theme==="light" ? styles.litH : styles.darkH)}>Home</Link>
                <div className={styles.products} onClick={handleDrop} ref={dropRef}>
                    <div className={styles.prodDrop}>
                        <div className={styles.prodName}>Products</div>
                        {theme==="light" ? <img src={dropdown} alt="" /> : <img src={dropdownWhite} alt=""/>}
                    </div>
                    <div className={styles.links + " " + (drop && styles.visible) + " " + (theme==="light" ? styles.litDrop : styles.darkDrop) }>
                        <div className={styles.prodLink}>
                            <Link to="tv" className={theme==="light" ? styles.litLink : styles.darkLink}>Televisions</Link>
                        </div>
                        <div className={styles.prodLink}>
                            <Link to="laptop" className={theme==="light" ? styles.litLink : styles.darkLink}>Laptops</Link>
                        </div>
                        <div className={styles.prodLink}>
                            <Link to="mobile" className={theme==="light" ? styles.litLink : styles.darkLink}>Smartphones</Link>
                        </div>
                        <div className={styles.prodLink}>
                            <Link to="gaming" className={theme==="light" ? styles.litLink : styles.darkLink}>Gaming</Link>
                        </div>
                    </div>
                </div>
                <button className={styles.themeBut} onClick={chTheme}>
                    {theme==="light" ? <img src={sun} alt="light theme" /> : <img src={moon} alt="dark theme"/>}
                </button>
                <Link to="cart" className={styles.cartLink}>
                    <div className={styles.cart}>
                        {theme==="light" ? <img src={cart}/> : <img src={cartWhite}/>}
                        <div className={styles.cartCnt + " " + (theme==="light" ? styles.cartL : styles.cartD)}>{cnt}</div>
                    </div>
                </Link>
            </div>    
        </nav>       
    )
}