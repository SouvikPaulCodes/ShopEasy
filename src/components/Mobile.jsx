import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import styles from '../styles/Mobile.module.css'

export default function mobile() {
    const [theme, items, handleItems, increaseCart, decreaseCart] = useOutletContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [sort, setSort] = useState("none");
    const [quantity, setQuantity] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await fetch("https://api.mockfly.dev/mocks/a8379ca0-490e-4a46-8f82-d7ae7199b5c1/products/mobiles")

                const jsonData = await rawData.json();
                console.log(jsonData);
                
                setLoading(false);
                setData(jsonData);
            }
            catch {
                setError(true);
                setLoading(false);
            }
        }

        fetchData()
    },[])

    const handleSort = (val) => {
        setSort(val)
    }

    const handleQuantity = (mobile, val) => {
        setQuantity(prev => ({...prev, [mobile.id]: val}))
    }

    const handleIncrease = (mobile) => {
        const qty = quantity[mobile.id] || 0;
        increaseCart(qty)
        handleItems(mobile, qty, "add")
        handleQuantity(mobile, 0)
    }

    const ascData = data?.mobile ?
    [...data.mobile].sort((a, b) => {
      const aPrice = a.discount ? a.price * (100 - a.discount) / 100 : a.price;
      const bPrice = b.discount ? b.price * (100 - b.discount) / 100 : b.price;
      return aPrice - bPrice;
    })
    : [];

      
    const descData = [...ascData].reverse();

    const finalData = data?.mobile
    ? sort === 'none'
        ? data.mobile
        : sort === 'ascending'
        ? ascData
        : descData
    : [];


    return (
        <main className={theme==="light" ? styles.litMain : styles.darkMain}>
        {loading ? 
        <h1 className={styles.loading}>Loading ...</h1> :
        error ? <h1 className={styles.error}>Unable to fetch data currently. Sorry for the inconvenience!</h1> :
        (<>
            <header>
                <h1 className={styles.prodHead}>Smartphones</h1>
                <div className={styles.options}>
                    <label className={styles.sortLab}> Sort by: {' '}
                        <select onClick={(e) => handleSort(e.target.value)}>
                            <option value="none" defaultChecked>None</option>
                            <option value="ascending">Prices: Low to High</option>
                            <option value="descending">Prices: High to Low</option>
                        </select>
                    </label>
                </div>
            </header>
            <div className={styles.prodList}>
                {finalData.map(mobile => {
                    return (
                        <div key={mobile.id} className={styles.prodCard}>
                            <img className={styles.prodImg} src={mobile.image} alt=""/>
                            <div className={styles.info}>
                                {mobile.discount 
                                ? <div className={styles.disPrice}>
                                    <del>{mobile.price}</del>
                                    <div className={styles.actPrice}>{"₹" + mobile.price * (100 - mobile.discount) / 100}</div>
                                  </div>
                                : <div className={styles.actPrice}>{"₹" + mobile.price}</div>}
                                <div className={styles.prodTitle}>{mobile.title}</div>
                                <div className={styles.buy}>
                                    <input type="number" min={0} value={quantity[mobile.id] || 0} onChange={(e) => handleQuantity(mobile, Number(e.target.value))}/>
                                    <button className={styles.addBut} onClick={() => handleIncrease(mobile)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </>
        )
        }
        </main>
    )
}