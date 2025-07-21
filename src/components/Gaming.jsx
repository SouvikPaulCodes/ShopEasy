import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import styles from '../styles/Gaming.module.css'

export default function gaming() {
    const [theme, items, handleItems, increaseCart, decreaseCart] = useOutletContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [sort, setSort] = useState("none");
    const [quantity, setQuantity] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await fetch("https://api.mockfly.dev/mocks/a8379ca0-490e-4a46-8f82-d7ae7199b5c1/products/gaming")

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

    const handleQuantity = (gaming, val) => {
        setQuantity(prev => ({...prev, [gaming.id]: val}))
    }

    const handleIncrease = (gaming) => {
        const qty = quantity[gaming.id] || 0;
        increaseCart(qty)
        handleItems(gaming, qty, "add")
        handleQuantity(gaming, 0)
    }

    const ascData = data?.gaming ?
    [...data.gaming].sort((a, b) => {
      const aPrice = a.discount ? a.price * (100 - a.discount) / 100 : a.price;
      const bPrice = b.discount ? b.price * (100 - b.discount) / 100 : b.price;
      return aPrice - bPrice;
    })
    : [];

      
    const descData = [...ascData].reverse();

    const finalData = data?.gaming
    ? sort === 'none'
        ? data.gaming
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
                <h1 className={styles.prodHead}>Gaming</h1>
                <div className={styles.options}>
                    <label className={styles.sortLab}> Sort by: {' '}
                        <select onChange={(e) => handleSort(e.target.value)}>
                            <option value="none" defaultChecked>None</option>
                            <option value="ascending">Prices: Low to High</option>
                            <option value="descending">Prices: High to Low</option>
                        </select>
                    </label>
                </div>
            </header>
            <div className={styles.prodList}>
                {finalData.map(gaming => {
                    return (
                        <div key={gaming.id} className={styles.prodCard}>
                            <img className={styles.prodImg} src={gaming.image} alt=""/>
                            <div className={styles.info}>
                                {gaming.discount 
                                ? <div className={styles.disPrice}>
                                    <del>{gaming.price}</del>
                                    <div className={styles.actPrice}>{"₹" + gaming.price * (100 - gaming.discount) / 100}</div>
                                  </div>
                                : <div className={styles.actPrice}>{"₹" + gaming.price}</div>}
                                <div className={styles.prodTitle}>{gaming.title}</div>
                                <div className={styles.buy}>
                                    <input type="number" min={0} value={quantity[gaming.id] || 0} onChange={(e) => handleQuantity(gaming, Number(e.target.value))}/>
                                    <button className={styles.addBut} onClick={() => handleIncrease(gaming)}>Add to Cart</button>
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