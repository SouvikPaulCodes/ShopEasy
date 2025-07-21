import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import styles from '../styles/Laptop.module.css'

export default function Laptop() {
    const [theme, items, handleItems, increaseCart, decreaseCart] = useOutletContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [sort, setSort] = useState("none");
    const [quantity, setQuantity] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await fetch("https://api.mockfly.dev/mocks/a8379ca0-490e-4a46-8f82-d7ae7199b5c1/products/laptop")

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

    const handleQuantity = (laptop, val) => {
        setQuantity(prev => ({...prev, [laptop.id]: val}))
    }

    const handleIncrease = (laptop) => {
        const qty = quantity[laptop.id] || 0;
        increaseCart(qty)
        handleItems(laptop, qty, "add")
        handleQuantity(laptop, 0)
    }

    const ascData = data?.laptop ?
    [...data.laptop].sort((a, b) => {
      const aPrice = a.discount ? a.price * (100 - a.discount) / 100 : a.price;
      const bPrice = b.discount ? b.price * (100 - b.discount) / 100 : b.price;
      return aPrice - bPrice;
    })
    : [];

      
    const descData = [...ascData].reverse();

    const finalData = data?.laptop
    ? sort === 'none'
        ? data.laptop
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
                <h1 className={styles.prodHead}>Laptops</h1>
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
                {finalData.map(laptop => {
                    return (
                        <div key={laptop.id} className={styles.prodCard}>
                            <img className={styles.prodImg} src={laptop.image} alt=""/>
                            <div className={styles.info}>
                                {laptop.discount 
                                ? <div className={styles.disPrice}>
                                    <del>{laptop.price}</del>
                                    <div className={styles.actPrice}>{"₹" + laptop.price * (100 - laptop.discount) / 100}</div>
                                  </div>
                                : <div className={styles.actPrice}>{"₹" + laptop.price}</div>}
                                <div className={styles.prodTitle}>{laptop.title}</div>
                                <div className={styles.buy}>
                                    <input type="number" min={0} value={quantity[laptop.id] || 0} onChange={(e) => handleQuantity(laptop, Number(e.target.value))}/>
                                    <button className={styles.addBut} onClick={() => handleIncrease(laptop)}>Add to Cart</button>
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