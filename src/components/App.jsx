import { useEffect, useState, useMemo } from 'react'
import styles from '../styles/App.module.css'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Headermob from './Headermob'
import { useMediaQuery } from 'react-responsive';
import github from '../assets/github-mark.svg'
import githubWhite from '../assets/github-mark-white.svg'


function App() {
  const [theme, setTheme] = useState("light");
  const [cart, setCart] = useState(() => {
    const data = JSON.parse(localStorage.getItem("products")) || []
    const cnt = data.reduce((tot, cur) => tot+cur.num, 0)

    return cnt
  });

  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || []
  })

  const useful = useMemo(() => items.filter(it => it.num > 0), [cart])

  useEffect(() => {
    setItems(useful)
  }, [useful])

  console.log(items)

  const handleItems = (prod, qty, param) => {
    if(qty<0) return
    else if(qty==0 && param!=="change") return

    setItems(prev => {
      const index = prev.findIndex(it => it.id === prod.id)
      if(index===-1){
        return [...prev, {...prod, num: qty}]
      }
      else {
        const updated = [...prev]
        if(param==="add") updated[index].num += qty
        else if(param==="subtract") updated[index].num -= qty
        else updated[index].num = qty
        return updated
      }
    })
  }

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(items))
  }, [items])

  const isMobile = useMediaQuery({query: '(max-width: 600px)'});

  console.log(isMobile)

  const increaseCart = (num) => {
    if(num>=0) setCart(cart+num);
  }

  const decreaseCart = (num) => {
    if(num<=cart) setCart(cart-num);
  }

  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <>
      {isMobile ? <Headermob theme={theme} chTheme={changeTheme} cnt={cart} /> :
      <Header theme={theme} chTheme={changeTheme} cnt={cart}/>}
      <Outlet context={[theme, items, handleItems, increaseCart, decreaseCart]}/>
      <footer className={theme==="light" ? styles.footL : styles.footD}>
        <a className={styles.gitLink} href="https://github.com/SouvikPaulCodes" target='_blank'>
          <div className={styles.footerText}>Created by SouvikPaulCodes</div>
          {theme==="light" ? <img src={github} /> : <img src={githubWhite} />}
        </a>
      </footer>
    </>
  )
}

export default App
