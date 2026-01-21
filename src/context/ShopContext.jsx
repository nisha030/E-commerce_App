import { ShopContext } from "./ShopContext.js";
import { products } from "../assets/frontend_assets/assets";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";

const ShopContextProvider = (props) =>{

    const currency = "$";
    const delivery_charges = 10;
    const[search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(true)
    const [cartItem, setCartItem] = useState({})
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [backendProducts, setBackendProducts] = useState([])
    const navigate = useNavigate()

    // Load user on mount
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await apiService.getCurrentUser();
                    setUser(response.data.user);
                } catch (error) {
                    localStorage.removeItem('token');
                    console.error('Failed to load user:', error);
                }
            }
        };
        loadUser();
    }, []);

    // Load products from backend
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const response = await apiService.getProducts({ limit: 100 });
                setBackendProducts(response.data.products);
            } catch (error) {
                console.error('Failed to load products:', error);
                // Fallback to local products
                setBackendProducts(products);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Authentication functions
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await apiService.login({ email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            toast.error(error.message || 'Login failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await apiService.register(userData);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            toast.error(error.message || 'Registration failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setCartItem({});
        toast.success('Logged out successfully');
        navigate('/');
    };

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
    const productList = backendProducts.length > 0 ? backendProducts : products;
    for(const items in cartItem){
        let itemInfo = productList.find((product)=> product._id === items);
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

// Order management functions
const createOrder = async (orderData) => {
    try {
        setLoading(true);
        const response = await apiService.createOrder(orderData);
        toast.success('Order placed successfully!');
        setCartItem({}); // Clear cart after successful order
        return { success: true, order: response.data.order };
    } catch (error) {
        toast.error(error.message || 'Failed to create order');
        return { success: false, error: error.message };
    } finally {
        setLoading(false);
    }
};

const getOrders = async (params = {}) => {
    try {
        const response = await apiService.getOrders(params);
        return { success: true, orders: response.data.orders };
    } catch (error) {
        toast.error(error.message || 'Failed to fetch orders');
        return { success: false, error: error.message };
    }
};

const getOrderTracking = async (orderId) => {
    try {
        const response = await apiService.getOrderTracking(orderId);
        return { success: true, order: response.data.order };
    } catch (error) {
        toast.error(error.message || 'Failed to fetch order tracking');
        return { success: false, error: error.message };
    }
};

// Review functions
const createReview = async (reviewData) => {
    try {
        setLoading(true);
        const response = await apiService.createReview(reviewData);
        toast.success('Review submitted successfully!');
        return { success: true, review: response.data.review };
    } catch (error) {
        toast.error(error.message || 'Failed to submit review');
        return { success: false, error: error.message };
    } finally {
        setLoading(false);
    }
};

const getProductReviews = async (productId, params = {}) => {
    try {
        const response = await apiService.getProductReviews(productId, params);
        return { success: true, reviews: response.data.reviews };
    } catch (error) {
        toast.error(error.message || 'Failed to fetch reviews');
        return { success: false, error: error.message };
    }
};

    // useEffect(()=>{
    //     localStorage.setItem('cartItem', JSON.stringify(cartItem))
    // }, [cartItem])


    const value = {
        products: backendProducts.length > 0 ? backendProducts : products, 
        currency, delivery_charges,
        search, setSearch, showSearch, setShowSearch,
        cartItem, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, user, loading,
        login, register, logout,
        createOrder, getOrders, getOrderTracking,
        createReview, getProductReviews
    }

    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;