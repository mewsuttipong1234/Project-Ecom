import { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from '../components/card/CartCard'


const Shop = () => {

  const getProduct = useEcomStore((state)=>state.getProduct)
  const products = useEcomStore((state)=>state.products)

  useEffect(()=>{
    getProduct()
  },[])



  return (
    <div className="flex ">
      <div className="w-1/4 bg-gray-100 h-screen border p-4">
      <SearchCard/>
      </div>

      <div className="w-1/2  h-screen p-4 overflow-y-auto">
        <p className="text-2xl font-bold mb-4">Product all</p>
        <div className="flex flex-wrap gap-5">
          {/*Product cart*/}
          {
            products.map((item,index)=>
              <ProductCard key={index} item={item}/>
            )
          }
          
      
        </div>
      </div>

      <div className="w-1/4 bg-gray-100 h-screen overflow-y-auto border p-4">
        <CartCard/>
      </div>
    </div>
  );
};
export default Shop;
