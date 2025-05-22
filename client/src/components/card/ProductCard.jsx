import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";

const ProductCard = ({ item }) => {

  const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)
  return (
    <div className="border rounded-md shadow-md p-2 w-56">
      <div>
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0].url}
         className="rounded-md w-full h-24 object-cover transform hover:scale-110 transition duration-300"
           />
        ) : (
          <div className="w-full h-24 bg-red-400 rounded-md text-center flex items-center justify-center shadow">
            No Images
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-xl ">{item.title}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="flex justify-between px-2 items-center">
        <span className="font-bold">{item.price}</span>
        <button  
        onClick={()=>actionAddtoCart(item)}
        className="bg-blue-200 p-1 rounded-md hover:bg-blue-500">
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
