import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency, delivery_charges, getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p>{currency}{delivery_charges}.00</p>
            </div>
            <div className="flex justify-between">
                <p>Total Amount</p>
                <p>{currency}{getCartAmount() + delivery_charges}.00</p>
            </div>
        </div>

    </div>
  )
}

export default CartTotal