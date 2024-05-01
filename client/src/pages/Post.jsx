import { useState, useRef } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./modal.css";
import axios from "axios";
import { useEffect } from "react";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "./../firebase";
import { useUser } from "../context/User";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/Toast";
import TextEditor from "./../components/Editor";
import { FaPenSquare } from "react-icons/fa";

const Post = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "1",
  });
  const [progress, setProgress] = useState(0);
  const [image, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const fileRef = useRef();
  const userData = useUser();
  const navigate = useNavigate();
  const toast = useToast();
  const myRef = useRef(null);

  const handleCloseModel = () => {
    setShowModal(!showModal);
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/blogs/getCategory",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(res.data.list);
    } catch (error) {}
  };

  useEffect(() => {
    getCategory();
  }, [showModal]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = () => {
    const file = fileRef.current.files[0];
    if (!file) {
      toast.showErrorMessage("No Image Selected");
      return;
    }

    const storage = getStorage(app);
    const storageRef = ref(storage, "blogImages/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setProgress(0);
      },
      async () => {
        try {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUrl(downloadUrl);
            setUploading(false);
          });
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const author_id = userData.userInfo.user_id;
    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.showErrorMessage("Unauthorized");
      navigate("/login");
      return;
    }

    if (formData.content === "") {
      toast.showErrorMessage("Save the content or write something");
      return;
    }

    if (!image) {
      toast.showErrorMessage("Please Upload Image");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/blogs/addBlog",
        { formData, author_id, image },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.showMessage(res.data.message);
      setShowModal(close);
    } catch (error) {
      console.log(error);
    }
  };

  const showSelectedFileName = () => {
    const selectedName = fileRef.current.files[0];
    if (selectedName) {
      setSelectedFileName(selectedName.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleContentData = (data) => {
    setFormData({
      ...formData,
      content: data,
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-3">
          <FaPenSquare size={20}/>
          <button onClick={() => setShowModal(true)}>Write</button>
        </div>
        <Modal
          open={showModal}
          showCloseIcon={false}
          onClose={handleCloseModel}
          container={myRef.current}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
        >
          <div className="container mx-auto">
            <form className="p-3 rounded-xl" onSubmit={handleSubmit}>
              <div className="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
                <div className="w-full sm:w-auto px-4 mb-6 sm:mb-0">
                  <h4 className="text-2xl font-bold tracking-wide text-white mb-1">
                    Post Blog
                  </h4>
                  <p className="text-sm text-gray-300">
                    Write About Your Blog Here
                  </p>
                </div>
                ''
                <div className="w-full sm:w-auto px-4">
                  <div>
                    <a
                      className="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-400 bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-200"
                      href="#"
                      onClick={handleCloseModel}
                    >
                      Cancel
                    </a>
                    <button
                      className="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-blue-50 bg-orange-800 hover:bg-orange-700 disabled:bg-orange-400 rounded-lg transition duration-200"
                      href="#"
                      disabled={uploading}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
                  <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
                    <span className="text-sm font-medium text-gray-100">
                      Title
                    </span>
                  </div>
                  <div className="w-full sm:w-2/3 px-4">
                    <div className="max-w-full">
                      <input
                        className="block py-4 px-3 w-full text-sm text-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white rounded-lg"
                        id="formInput1-2"
                        type="text"
                        placeholder="Type Here....."
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
                  <div className="w-full px-4 mb-4">
                    <span className="text-sm font-medium text-gray-100">
                      Content
                    </span>
                  </div>
                  <div className="w-full">
                    <TextEditor
                      setContent={(data) => handleContentData(data)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-start -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
                  <div className="w-full sm:w-1/3 px-4 mb-6 sm:mb-0">
                    <span className="block text-sm font-medium text-gray-100">
                      Photo
                    </span>
                    <span className="text-xs text-gray-400">
                      Upload an Image
                    </span>
                  </div>
                  <div className="w-full sm:w-2/3 px-4">
                    <div className="flex flex-wrap sm:flex-nowrap max-w-xl">
                      <div className="flex-shrink-0 w-20 h-20 mb-4 mr-4">
                        <img
                          src={image ? image : ""}
                          alt=""
                          className="rounded-md"
                          required
                        />
                      </div>
                      <div className="w-full py-8 px-4 text-center border-dashed border flex flex-col border-gray-400 hover:border-white rounded-lg">
                        <div className="relative group h-14 w-14 mx-auto mb-4">
                          <div className="flex items-center justify-center h-14 w-14 bg-blue-500 group-hover:bg-blue-600 rounded-full">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.71 5.71002L9 3.41002V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3.41002L13.29 5.71002C13.383 5.80375 13.4936 5.87814 13.6154 5.92891C13.7373 5.97968 13.868 6.00582 14 6.00582C14.132 6.00582 14.2627 5.97968 14.3846 5.92891C14.5064 5.87814 14.617 5.80375 14.71 5.71002C14.8037 5.61706 14.8781 5.50645 14.9289 5.3846C14.9797 5.26274 15.0058 5.13203 15.0058 5.00002C15.0058 4.86801 14.9797 4.7373 14.9289 4.61544C14.8781 4.49358 14.8037 4.38298 14.71 4.29002L10.71 0.290018C10.6149 0.198978 10.5028 0.127613 10.38 0.0800184C10.1365 -0.0199996 9.86346 -0.0199996 9.62 0.0800184C9.49725 0.127613 9.3851 0.198978 9.29 0.290018L5.29 4.29002C5.19676 4.38326 5.1228 4.49395 5.07234 4.61577C5.02188 4.73759 4.99591 4.86816 4.99591 5.00002C4.99591 5.13188 5.02188 5.26245 5.07234 5.38427C5.1228 5.50609 5.19676 5.61678 5.29 5.71002C5.38324 5.80326 5.49393 5.87722 5.61575 5.92768C5.73757 5.97814 5.86814 6.00411 6 6.00411C6.13186 6.00411 6.26243 5.97814 6.38425 5.92768C6.50607 5.87722 6.61676 5.80326 6.71 5.71002ZM19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z"
                                fill="#E8EDFF"
                              ></path>
                            </svg>
                          </div>
                          <input
                            className="absolute top-0 left-0 h-14 w-14 opacity-0"
                            id="formInput1-4"
                            type="file"
                            name="filephoto"
                            accept="image/*"
                            ref={fileRef}
                            onChange={showSelectedFileName}
                            required
                          />
                        </div>
                        {selectedFileName && (
                          <p className="text-white">{selectedFileName}</p>
                        )}
                        <p className="font-semibold leading-normal mb-1">
                          <span className="text-blue-500">
                            Click to upload a file
                          </span>
                          <span className="text-gray-300">
                            or drag and drop
                          </span>
                        </p>
                        <span className="text-xs text-gray-300 font-semibold">
                          PNG, JPG, GIF or up to 10MB
                        </span>
                        <button
                          type="button"
                          className="inline-block mt-4 py-2 px-4 text-xs text-center font-semibold leading-normal text-blue-50 bg-orange-800 hover:bg-orange-700 rounded-lg transition duration-200 disabled:bg-orange-400"
                          href="#"
                          onClick={handleImageUpload}
                          disabled={uploading}
                        >
                          Upload
                        </button>
                        {uploading && (
                          <p className="text-white mt-5">
                            Uploading {progress}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
                  <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
                    <span className="text-sm font-medium text-gray-100">
                      Category
                    </span>
                  </div>
                  <div className="w-full sm:w-2/3 px-4">
                    <div className="max-w-xl">
                      <select
                        className="block py-4 px-3 w-full text-sm text-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white rounded-lg"
                        id="formInput1-5"
                        type="text"
                        placeholder="Frontend Developer"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((data) => {
                          return (
                            <option
                              className="bg-gray-700"
                              key={data.category_id}
                              value={data.category_id}
                            >
                              {data.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Post;
