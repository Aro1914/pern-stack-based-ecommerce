import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

export const cartSlice = createSlice({
    name: "cart",
    initialState:{ value: [],total: 0},
    reducers:{
        addItem: (state, action)=>{
            state.value= [
                ...state.value,
                {
                    cartId: ++lastId,
                    id: action.payload.id,
                    title: action.payload.title,
                    quantity: action.payload.quantity,
                    price: action.payload.price,
                    description: action.payload.description,
                    rating: action.payload.rating,
                    image: action.payload.image
                }
            ];
            state.total += 1;
        },
        removeItem: (state, action)=>{
            state.total -= state.value[action.payload.id].quantity;
            state.value = state.value.filter( item => item.id !== action.payload.id)
        },
        decrementItemQuantity: (state, action)=>{
            state.value = state.value.map(item => item.id === action.payload.id ? {
                ...item, quantity: --item.quantity
            } : item );
            state.total -= 1;
        },
        incrementItemQuantity: (state, action)=>{
            state.value = state.value.map(item => item===action.payload.id ? {
                ...item, quantity: ++item.quantity
            } : item);
            state.total += 1;
        }
    }
})

export const {addItem, removeItem, decrementItemQuantity, incrementItemQuantity} = cartSlice.actions;

export default cartSlice.reducer;