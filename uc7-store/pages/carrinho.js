"use client";

import { useContext, useEffect, useState }  from 'react';
import { CartContext } from '@/context/CartContext';
import styles from './carrinho.module.css';
import Cabecalho from '@/app/cabecalho';
import Footer from '@/app/footer';

export default function Carrinho() {
    const { cart, loading, removeFromCart, changeQuantityInCart, getTotalPriceInCart } = useContext(CartContext);
    const [totalPrice, setTotalPirice] = useState(0);

    useEffect(() => {
        async function fetchTotalPrice() {
            if (cart) {
                const price = await getTotalPriceInCart();
                setTotalPirice(price);
            }
        }
        fetchTotalPrice();
    }, [cart, getTotalPriceInCart]);
    if (loading) {
        return <div>Loading...</div>
    }
    if (!cart || cart.length === 0) {
        return <div>Your cart is empty.</div>
    }
    return (
        <>
            <Cabecalho />
            <div className={styles.container}>
                <h1>Your Cart</h1>
                <ul className={styles.cartlist}>
                    {cart.map((item) => (
                        <li key={item.productId} className={styles.cartItem}>
                            <img src={item.imagePath} alt={item.name} className={styles.productImage} />
                            <div className={styles.productDetails}>
                                <h2>{item.name}</h2>
                                <p>Price: R$ {item.price}</p>
                                <p>Quantity:
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) => changeQuantityInCart(item.productId, parseInt(e.target.value))}
                                      min="1"
                                  />
                                </p>
                                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles.totalPrice}>
                    <h2>Total Price: R$ {totalPrice}</h2>
                </div>
            </div>
            <Footer />
        </>
    );
} 