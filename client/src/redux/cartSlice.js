
import { createSlice } from '@reduxjs/toolkit'



const getTotalFunc = (list) => {
  let amount = list.reduce((acc, cur) => acc + cur.qty * cur.price, 0)
  let qty = list.reduce((acc, cur) => acc + cur.qty, 0)
  return { amount, qty }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
    totleAmount: 0,
    totalQty: 0

  },
  reducers: {
    addToCart: (state, action) => {
      const found = state.value.find(item => item._id === action.payload._id)
      if (found) {
        found.qty = found.qty + action.payload.qty
      } else {
        state.value.push(action.payload)
      }
      state.totleAmount = getTotalFunc(state.value).amount
      state.totalQty = getTotalFunc(state.value).qty
    },
    increment: (state, action) => {
      const found = state.value.find(item => item._id === action.payload)
      if (found) {
        found.qty++
      }
      state.totleAmount = getTotalFunc(state.value).amount
      state.totalQty = getTotalFunc(state.value).qty
    },
    decrement: (state, action) => {
      const found = state.value.find(item => item._id === action.payload)
      if (found) {
        if (found.qty === 1) {
          found.qty = 1
        } else {
          found.qty--
        }
      }
      state.totleAmount = getTotalFunc(state.value).amount
      state.totalQty = getTotalFunc(state.value).qty
    },
    removeItem: (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload)
      state.totleAmount = getTotalFunc(state.value).amount
      state.totalQty = getTotalFunc(state.value).qty
    }
    ,
    resetCart: state => { state.value = [] },

  }
})

// get cartlist
export const cart = state => state.cartSlice.value
export const num = state => state.cartSlice.totalQty
export const amt = state => state.cartSlice.totleAmount




export const { totleAmount, totalQty } = state => state.cartSlice

export const { addToCart, increment, decrement, removeItem } = cartSlice.actions

export default cartSlice.reducer