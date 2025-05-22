import { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { X ,Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const files = e.target.files;
    setIsLoading(true)
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; //[]
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);

        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not images 🖼️`);
          continue;
        }

        //image Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPG",
          100,
          0,
          (data) => {
            //function endpoint backend
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false)
                toast.success("Upload Images Success 🎃 ");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
              });
          },
          "base64"
        );
      }
    }
  };
  console.log("form->", form);

  const handleDelete =(public_id)=>{
    // console.log(public_id)
    const images = form.images
    removeFiles(token,public_id)
    .then((res)=>{
        // console.log(res)
        const filterImages = images.filter((item)=>{
            return item.public_id !== public_id
        })
         console.log(filterImages)
        //  console.log('res',res.data)
         setForm({
            ...form,
            images:filterImages
         })
        toast.error('Remove Image Success')
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4 ">{/*image*/}
        {
          isLoading &&<Loader className="w-16 h-16 animate-spin" />
        }
      
            {
                form.images.map((item,index)=>
                    <div key={index} className="relative">
                            <img className="w-24 h-24 hover:scale-105 " src={item.url} />
                            <span 
                            onClick={()=>handleDelete(item.public_id)}
                            className="absolute top-0 right-0 bg-red-400 rounded-md"><X /></span>
                    </div>
                )
            }

      </div>

      <div>
        <input type="file" name="images" multiple onChange={handleOnChange} />
      </div>
    </div>
  );
};
export default Uploadfile;
