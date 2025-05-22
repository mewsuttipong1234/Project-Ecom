import { creatProduct, deleteProduct } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Cog } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
const initialState = {
  title: "",
  description: "",
  price:0 ,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const catagorise = useEcomStore((state) => state.categorise);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  // console.log("Product->", products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price:0 ,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);
  // console.log(catagorise)

  const handleOnchange = (e) => {
    // console.log(e.target.name , e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await creatProduct(token, form);

    //   console.log("res->", res.data);
      toast.success(`Add ${res.data.title} success ☑️`);

      await getProduct(token, 20);
      setForm(initialState);
      getProduct()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id)=>{
    if(window.confirm('Sure ?')){
      try{
        const res = await deleteProduct(token,id)
        console.log(res)
       
      getProduct()
        toast.success('Delete Product Success')
      }catch(err){
        console.log(err)
      }

    }
    // console.log(id)
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleOnchange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border"
          value={form.description}
          onChange={handleOnchange}
          placeholder="description"
          name="description"
        />
        <input
          className="border"
          type="number"
          value={form.price}
          onChange={handleOnchange}
          placeholder="price"
          name="price"
        />
        <input
          className="border"
          type="number"
          value={form.quantity}
          onChange={handleOnchange}
          placeholder="quantity"
          name="quantity"
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnchange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {catagorise.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <br />
         {/* Upload img*/}
         <Uploadfile form={form} setForm={setForm}/>
        <button className="bg-blue-500">Add</button>
        <br />
        <table className="table-auto w-full border-collapse shadow-md rounded-md overflow-hidden">
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="px-4 py-2 border">No.</th>
      <th className="px-4 py-2 border">Image</th>
      <th className="px-4 py-2 border">Title</th>
      <th className="px-4 py-2 border">Description</th>
      <th className="px-4 py-2 border">Price</th>
      <th className="px-4 py-2 border">Quantity</th>
      <th className="px-4 py-2 border">Category ID</th>
      <th className="px-4 py-2 border">Sold</th>
      <th className="px-4 py-2 border">Update At</th>
      <th className="px-4 py-2 border">Manage</th>
    </tr>
  </thead>
  <tbody>
    {
      products.map((item, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="px-4 py-2 border text-center">{index + 1}</td>
          <td >

              {
                item.images.length > 0
                ? <img
                className="w-24 h-24 rounded-lg shadow-md"
                src={item.images[0].url}/>
                : <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                    NO IMAGE

                </div>
              }

          </td>
          <td className="px-4 py-2 border">{item.title}</td>
          <td className="px-4 py-2 border">{item.description}</td>
          <td className="px-4 py-2 border text-right">{item.price}</td>
          <td className="px-4 py-2 border text-center">{item.quantity}</td>
          <td className="px-4 py-2 border text-center">{item.categoryId}</td>
          <td className="px-4 py-2 border text-center">{item.sold}</td>
          <td className="px-4 py-2 border text-center">{item.updatedAt}</td>
          <td className="flex items-center justify-center gap-4 py-5">
  <p className="p-2 bg-yellow-200 hover:bg-yellow-500 hover:scale-105 transition-all duration-300 rounded-md cursor-pointer">
    <Link to={`/admin/product/${item.id}`}>
      <Cog className="w-6 h-6" />
    </Link>
  </p>
  <p
    onClick={() => handleDelete(item.id)}
    className="p-2 bg-red-200 hover:bg-red-500 hover:scale-105 transition-all duration-300 rounded-md cursor-pointer"
  >
    <Trash2 className="w-6 h-6" />
  </p>
</td>
        </tr>
      ))
    }
  </tbody>
</table>

      </form>
    </div>
  );
};
export default FormProduct;
