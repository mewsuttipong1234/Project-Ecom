import useEcomStore from "../../store/ecom-store";
import { useState, useEffect, use } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilter = useEcomStore((state) => state.actionSearchFilter);

  const getCategory = useEcomStore((state) => state.getCategory);
  const categorise = useEcomStore((state) => state.categorise);

  const [text, SetText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  const [price, setPrice] = useState([100, 1000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  // console.log('test->',text)
  //step 1 Search Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilter({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  //step 2 search by category

  const handleCheck = (e) => {
    // console.log(e.target.value)
    const inCheck = e.target.value;
    const inState = [...categorySelected]; //[]
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilter({ category: inState });
    } else {
      getProduct();
    }
  };
  // console.log(categorySelected);
  //step 3 search by price
  useEffect(() => {
    actionSearchFilter({ price });
  }, [ok]);

  const handlePrice = (value) => {
    // console.log(value);
    setPrice(value)
    setTimeout(()=>{
        setOk(!ok)

    },300)
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Product Name</h1>
      <input
        className="border rounded-md w-full mb-4 px-2"
        placeholder="Search"
        type="text"
        onChange={(e) => SetText(e.target.value)}
      />
      <hr />

      {/* Search by category*/}

      <div>
        <h1 className="text-xl font-bold mb-4">Product categories</h1>
        <div>
          {categorise.map((item, index) => (
            <div className="flex gap-2">
              <input type="checkbox" value={item.id} onChange={handleCheck} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />

      <div>
        <h1>Search by Price</h1>
        <div>
            <div className="flex justify-between">
                <span>
                    Min : {price[0]}
                </span>
                <span>
                    Max: {price[1]}
                </span>
            </div>
          <Slider onChange={handlePrice} range min={0} max={10000}
            defaultValue={[100,1000]}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchCard;
