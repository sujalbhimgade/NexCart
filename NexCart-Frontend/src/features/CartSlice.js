import { createSlice } from "@reduxjs/toolkit";

const initialState =  {items: []}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addOrderItem: (state, action) => {
            console.log("called add order");
            state.items.push({quantity:1, productId: action.payload.id, price: action.payload.price})
          
        },
        removeOrderItem: (state, action) => {
            console.log("called removed item");
            
            state.items = state.items.filter((item) => item.productId !== action.payload.id)
        },
        updateOrderQuantiy: (state, action) => {
            console.log("called increment order");
            state.items.filter((item) => item.productId === action.payload.id)[0].quantity = action.payload.quantity
        },
        
    }
})

export const {addOrderItem, removeOrderItem, updateOrderQuantiy} = CartSlice.actions;
export default CartSlice.reducer;