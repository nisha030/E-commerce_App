import { ShopContext } from "./ShopContext.js";
import { products } from "../assets/frontend_assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShopContextProvider = (props) =>{

    const currency = "$";
    const delivery_charges = 10;
    const[search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(true)
    const [cartItem, setCartItem] = useState({})
    const navigate = useNavigate()

    const addToCart = (itemId, size)=>{
        if(!size){
            toast.error('Please select a size')
            return;
        }
        let cartData = structuredClone(cartItem);

        if(cartData[itemId]){
           if (cartData[itemId][size]){
            cartData[itemId][size]++;
           }
           else{
            cartData[itemId][size] = 1
           }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size] = 1
        }
        setCartItem(cartData)
    }

    const getCartCount = () =>{
        let totalCount = 0
        for(const items in cartItem){
            for(const item in cartItem[items]){
           try{
            if(cartItem[items][item] > 0)
                totalCount += cartItem[items][item] 
           }
        catch{
            toast.error('Error in getting cart count')
        }
        }
    }
        return totalCount;
    }

    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData)
    }

const getCartAmount = () => {
    let totalAmount = 0
    for(const items in cartItem){
        let itemInfo = products.find((product)=> product._id === items);
        for(const item in cartItem[items]){
            try{
            if(cartItem[items][item] > 0){
                totalAmount += itemInfo.price * cartItem[items][item]
            }
            }catch{
                toast.error('Error in getting cart amount')
            }
        }
    }
    return totalAmount;
}

    // useEffect(()=>{
    //     localStorage.setItem('cartItem', JSON.stringify(cartItem))
    // }, [cartItem])


    const value = {
        products, currency, delivery_charges,
        search, setSearch, showSearch, setShowSearch,
        cartItem, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate
    }

    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;