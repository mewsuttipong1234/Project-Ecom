import {
  creatProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Cog } from "lucide-react";
import { Trash2 } from "lucide-react";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "Yamaha R1",
  description: "2lor ",
  price: 4500,
  quantity: 20,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const catagorise = useEcomStore((state) => state.categorise);

  // console.log("Product->", products);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
    //   console.log("res form back", res);
      setForm(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  console.log(form)

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
      const res = await updateProduct(token,id, form);

      //   console.log("res->", res.data);
      toast.success(`Add ${res.data.title} success ☑️`);
      navigate('/admin/product')
      await getProduct(token, 20);
      setForm(initialState);
    } catch (err) {
      console.log(err);
    }
  };

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
        <Uploadfile form={form} setForm={setForm} />
        <button className="bg-blue-500">Add</button>
        <br />
      </form>
    </div>
  );
};
export default FormEditProduct;
