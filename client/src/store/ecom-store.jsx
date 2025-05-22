import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from 'lodash'
const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categorise: [],
  products: [],
  carts: [],
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    //Step Uniqe
    const  uniqe =_.unionWith(updateCart,_.isEqual)


    set({carts: uniqe });
  
  },

  actionUpdateQuantity:(productID , newQuantity)=>{
    // console.log('clike',productID,newQuantity)

    set((state)=>({
        carts : state.carts.map((item)=>
            item.id === productID
        ? { ...item,count: Math.max(1,newQuantity)}
        : item
        )
    }))

  },

  actionRemoveProduct:(productID)=>{

    set((state)=>({
        carts: state.carts.filter((item)=>
              item.id !== productID  
        )
    }))

    // console.log('remove',productID)
  },

    gettotalPrice:()=>{
    return get().carts.reduce((total,item)=>{
        return total + item.price * item.count
    },0)
  },


  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:5000/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });

    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      // console.log('res->',res)
      set({
        categorise: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      // console.log('res->',res)
      set({
        products: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilter: async (arg) => {
    try {
      const res = await searchFilters(arg);
      // console.log('res->',res)
      set({
        products: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
});

const userPersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, userPersist));

export default useEcomStore;
