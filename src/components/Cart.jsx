import styles from '../styles/Cart.module.css'
import { useOutletContext } from 'react-router-dom';

export default function Cart() {
    const [theme, items, handleItems, increaseCart, decreaseCart] = useOutletContext();

    let total = 0

    for(let i=0; i<items.length; i++){
        items[i].discount ?
        total += items[i].num*(items[i].price * (100 - items[i].discount) / 100)
        : total += items[i].num*items[i].price
    }

    const handleDecrease = (it) => {
        decreaseCart(1)
        handleItems(it, 1, "subtract")
    }

    const handleIncrease = (it) => {
        increaseCart(1)
        handleItems(it, 1, "add")
    }

    const handleChange = (it, val) => {
        const diff = Math.abs(it.num-val)
        console.log(diff)
        console.log(it.num)
        if(it.num<val) increaseCart(diff)
        else decreaseCart(diff)
        if(val==undefined) handleItems(it, 0, "change")
        else handleItems(it, val, "change")
    }

    console.log(total)

    return (
        <main className={theme==="light" ? styles.litMain : styles.darkMain}>
            <header>
                <h1 className={styles.cartHead}>My Cart</h1>
                <h2 className={styles.payable}>{"Total Payable: ₹" + total}</h2>
            </header>
            <div className={styles.cartList}>
                {items.map(it => {
                    return (
                        <div key={it.id} className={styles.cartItem}>
                            <img className={styles.itemImg} src={it.image} alt=""/>
                            <div className={styles.info}>
                                {it.discount 
                                ? <div className={styles.disPrice}>
                                    <del>{it.price}</del>
                                    <div className={styles.actPrice}>{"₹" + it.price * (100 - it.discount) / 100}</div>
                                    </div>
                                : <div className={styles.actPrice}>{"₹" + it.price}</div>}
                                <div className={styles.prodTitle}>{it.title}</div>
                                <div className={styles.buy}>
                                    <button className={styles.subBut} onClick={() => handleDecrease(it)}>-</button>
                                    <input type="number" className={styles.input} value={it.num || 0} onChange={(e) => handleChange(it, Number(e.target.value))}/>
                                    <button className={styles.addBut} onClick={() => handleIncrease(it)}>+</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>       
    )
}