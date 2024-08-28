import { UserContext, useState } from "react";
import { UserContext } from "./UserContext";
import { changeQuantityInCart, getTotalPriceInCart } from "@/query";

export function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useContext(UserContext);

    useEffect(() => {
        async function fetchCart() {
            try {
                const cartItems = await getCartItems(userId);
                setCart(cartItems);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, [userId]);

    const handleAddToCart = async (productId, quantity) => {
        try {
            const updateCart = await removeFromCart(userId, productId);
            setCart(updateCart.items);
        } catch (error) {
        console.error("Failed to remove item from cart:", error);
        }
    };

    const handleChangeQuantityInCart = async (productId, newQuantity) => {
        try {
            const updateCart = await changeQuantityInCart(userId, productId, newQuantity);
            setCart(updateCart.items);
        } catch (error) {
        console.error("Failed to change quantity in cart:", error);
        }
    };

    return (
        <CartContext.Provider
        value={{
            cart,
            loading,
            addToCart: handleAddToCart,
            removeFromCart: handleRemoveFromCart,
            changeQuantityInCart: handleChangeQuantityInCart,
            getTotalPriceInCart: handleTotalPriceInCart,
        }}
        >
            {children}
        </CartContext.Provider>
    );
}