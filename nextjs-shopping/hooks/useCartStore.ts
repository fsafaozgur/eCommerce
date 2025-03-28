import getToCart from '@/actions/Cart/getToCart';
import { create } from 'zustand';



const useCartStore = create((set) => ({
    items: [],
    items_zu: [],
    fetchItems:async(userId:any, jwt:any)=>{
        const data = await getToCart(userId, jwt)
        set({items:data})
    },
    removeItem: (id:any) => set(state=> ({
        items_zu: state.items_zu.filter((_,key) => id != key)
    })),
        
    addItem: (item:any) => set(state => ({
        items_zu: [...state.items_zu, item]
    }))
}))

export default useCartStore