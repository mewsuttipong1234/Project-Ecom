import { Trash,Plus ,Minus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);

  // คำนวณราคารวม
  // const total = carts.reduce((sum, item) => sum + item.price * item.count, 0);

  const actionUpdateQuantity = useEcomStore((state)=>state.actionUpdateQuantity)
  const actionRemoveProduct = useEcomStore((state)=>state.actionRemoveProduct)
  const gettotalPrice = useEcomStore((state)=>state.gettotalPrice)

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-2">ตระกร้าสินค้า</h1>

      <div className="border p-2 bg-white rounded-md shadow-md space-y-4">
        {carts.map((item) => (
          <div key={item.id} className="space-y-2">
            {/* Row 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">

                {
                  item.images && item.images.length > 0 
                  ? <img 
                  className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500"
                  src={item.images[0].url}/>
                  : <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                  no img
                </div>
                }
               

                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-gray-500 text-sm">{item.description}</span>
                </div>
              </div>

              <button className="text-red-500 hover:underline" 
              onClick={()=>actionRemoveProduct(item.id)}>
                <Trash />
              </button>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between items-center">
              <div className="border rounded-md px-2 py-1 flex items-center gap-2">
                <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>actionUpdateQuantity(item.id , item.count-1)}>
               
                <Minus />
                </button>

                <span className="px-2">{item.count}</span>

                <button className="px-2 py-1 bg-gray-100 rounded" onClick={()=>actionUpdateQuantity(item.id , item.count+1)}>
                <Plus />
                </button>

              </div>

              <div className="font-bold text-blue-500">
                 {item.price * item.count} 
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between px-2 mt-4 mb-2 font-semibold">
        <span>รวม</span>
        <span>{gettotalPrice()}</span>
      </div>

        <Link to={'/cart'}>
        <button className="bg-green-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-700">
        ดำเนินการชำระเงิน
      </button>
        </Link>
   
    </div>
  );
};

export default CartCard;
