import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getAllCategories } from "../../store/CategorySlice";
// import { editProduct, getSingleProduct } from "../../store/ProductsSlice";
import i18n from 'i18next';
import { useNavigate } from "react-router-dom";
import ReactImageUploading from "react-images-uploading";
import ReactQuill from "react-quill";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

const EditProducts = () => {
    const [title, setTitle] = useState("");
    const [titleAr, setTitleAr] = useState("");
    const [modelen, setmodelen] = useState("");
    const [category, SetCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [productDescription, SetProductDescription] = useState("");
    const [productDescriptionAr, SetProductDescriptionAr] = useState("");
    const [imageCover, setImageCover] = useState(null);
    // const { categories } = useSelector((state) => state.CategorySlice);
    // const { product } = useSelector((state) => state.ProductsSlice);
    const categoriesData = categories?.data;
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const maxNumber = 4;

    const onChange = (imageList) => {
        setImages(imageList);
    };

    function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[arr.length - 1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
    }

    {
        i18n.language === 'ar' ? document.body.dir = 'ltr' : document.body.dir = 'ltr';
    }

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setTitle(product?.data?.title);
            setTitleAr(product?.data?.titleAr);
            setmodelen(product?.data?.modelen);
            SetCategory(product?.data?.category);
            setQuantity(product?.data?.quantity);
            setPrice(product?.data?.price);
            SetProductDescription(product?.data?.description);
            SetProductDescriptionAr(product?.data?.descriptionAr);

        
            let correctImageCover = product?.data?.imageCover;
            const prefix = "https://api.dansha-group.com/products/";
            if (correctImageCover && correctImageCover.startsWith(prefix + prefix)) {
                correctImageCover = correctImageCover.replace(prefix + prefix, prefix);
            }
            setImageCover(correctImageCover);
                        setImages([]);
        }
    }, [product]);
 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append('titleAr', titleAr);
      formData.append('modelen', modelen);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("description", productDescription);
      formData.append("descriptionAr", productDescriptionAr);
      formData.append("price", price);
   // Check if imageCover is a file object or a URL string
   if (typeof imageCover === "string") {
    const prefix = "https://api.dansha-group.com/products/";
    const cleanUrl = imageCover.startsWith(prefix) ? imageCover.slice(prefix.length) : imageCover;
    formData.append("imageCover", cleanUrl);

} else if (imageCover) {
    formData.append("imageCover", imageCover);
   
}
  
      images.forEach((image, index) => {
          const imgFile = dataURLtoFile(image.data_url, `image-${index}.png`);
          formData.append("images", imgFile);
      });
  
      await dispatch(editProduct({ id, formData })).then(() => {
          toast.success(`تمت تعديل المنتج بنجاح`)
      }).catch(error => {
          toast.error("حدث خطأ أثناء معالجة الطلب");
      });
      navigate("/Admin");
  };

    var modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] },
            ],
            [
                {
                    color: [
                        "#000000",
                        "#e60000",
                        "#ff9900",
                        "#ffff00",
                        "#008a00",
                        "#0066cc",
                        "#9933ff",
                        "#ffffff",
                        "#facccc",
                        "#ffebcc",
                        "#ffffcc",
                        "#cce8cc",
                        "#cce0f5",
                        "#ebd6ff",
                        "#bbbbbb",
                        "#f06666",
                        "#ffc266",
                        "#ffff66",
                        "#66b966",
                        "#66a3e0",
                        "#c285ff",
                        "#888888",
                        "#a10000",
                        "#b26b00",
                        "#b2b200",
                        "#006100",
                        "#0047b2",
                        "#6b24b2",
                        "#444444",
                        "#5c0000",
                        "#663d00",
                        "#666600",
                        "#003700",
                        "#002966",
                        "#3d1466",
                        "custom-color",
                    ],
                },
            ],
        ],
    };

    var formats = [
        "header",
        "height",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "color",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "size",
    ];

    const handleProcedureContentChangeEn = (content) => {
        SetProductDescription(content);
    };

    const handleProcedureContentChangeAr = (content) => {
        SetProductDescriptionAr(content);
    };

    return (
        <>
            <body className="bg-gray-800 flex">
                <form onSubmit={handleSubmit} className="max-w-md py-[25px] bg-gray-800 flex justify-center flex-col mx-auto p-3">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={titleAr}
                            onChange={(e) => setTitleAr(e.target.value)}
                            required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name Arabic</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={modelen}
                            onChange={(e) => setmodelen(e.target.value)}
                            required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Model</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={category}
                            onChange={(e) => SetCategory(e.target.value)}
                            required
                        >
                            {categoriesData && categoriesData.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {i18n.language === 'en' ? category.name : category.nameAr}
                                </option>
                            ))}
                        </select>
                        <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">sale</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label className="block text-sm font-medium text-white">Product Description en</label>
                        <ReactQuill
                            value={productDescription}
                            onChange={handleProcedureContentChangeEn}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label className="block text-sm font-medium text-white"> وصف المنتج عربي</label>
                        <ReactQuill
                            value={productDescriptionAr}
                            onChange={handleProcedureContentChangeAr}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label className="block text-sm font-medium text-white">Edit Image Cover</label>
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            onChange={(e) => setImageCover(e.target.files[0])}
                            
                        />
                        {imageCover && typeof imageCover === "string" && (
                            <img src={imageCover} alt="Cover" className="mt-3 h-20 w-20 object-contain" />
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label className="block text-sm font-medium text-white">Edit Images</label>
                        <ReactImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => (
                                <div className="upload__image-wrapper">
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Upload Images
                                    </button>
                                    &nbsp;
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={onImageRemoveAll}
                                    >
                                        Remove All Images
                                    </button>
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image.data_url} alt="" width="100" />
                                            <div className="image-item__btn-wrapper">
                                                <button
                                                    type="button"
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                                    onClick={() => onImageUpdate(index)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                    onClick={() => onImageRemove(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ReactImageUploading>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </body>
        </>
    );
};

export default EditProducts;
