import { LayoutList} from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link,useNavigate } from "react-router-dom";
import {creatUserCart} from  "../../api/user"
import { toast } from "react-toastify";


const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const token = useEcomStore((state)=> state.token)
  const user  = useEcomStore((state)=>state.user)
  const gettotalPrice = useEcomStore((state)=>state.gettotalPrice)

  const navigate = useNavigate()

  const handleSaveCart =async()=>{
    await creatUserCart(token,{cart})
    .then((res)=>{
      toast.success('Add to Cart Success')
      navigate('/checkout')
    })
    .catch((err)=>console.log(err))
  }


  return (
    <div className="bg-gray-100 rounded-md p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <LayoutList size={28} />
        <p className="text-xl font-bold">รายการสินค้า {cart.length} รายการ</p>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Left - Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-white p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md bg-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs rounded-md text-gray-500">
                    no img
                  </div>
                )}
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    ฿{item.price.toLocaleString()} x {item.count}
                  </p>
                </div>
              </div>
              <div className="text-blue-600 font-bold text-lg">
                ฿{(item.price * item.count).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Right - Summary */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4 h-fit">
          <p className="text-xl font-bold">ยอดรวม</p>
          <div className="flex justify-between text-lg">
            <span>รวมสุทธิ:</span>
            <span className="font-bold text-green-600">
              ฿{gettotalPrice()}
            </span>
          </div>

          <div className="flex flex-col gap-2">

            {
              user
              ? <Link>
                <button 
                onClick={handleSaveCart}
                className="bg-red-500 hover:bg-red-700 text-white w-full py-2 rounded-md shadow">
                    สั่งซื้อ
                </button>
                </Link>
              : <Link to={'/login'}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded-md shadow">
                    login
                </button>
                </Link>
            }
                
                <Link to={'/shop'}>
                <button className="bg-gray-500 hover:bg-gray-700 text-white w-full py-2 rounded-md shadow">
                    แก้ไขรายการ
                </button>
                </Link>
          </div>
   
        


        </div>
      </div>
    </div>
  );
};

export default ListCart;
