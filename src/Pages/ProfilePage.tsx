import { useEffect, useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineMail,
  AiOutlinePicture,
} from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import defaultAvatar from "../assets/images/no-profile-picture.svg";
import ChangePassword from "../components/ChangePassword";
import { useGetMeQuery } from "../Redux/features/user/userApi";

const ProfilePage = () => {
  const { data, isLoading } = useGetMeQuery(null);

  // Initialize form with fetched user data
  const [initialForm, setInitialForm] = useState({
    name: data?.data?.name || "",
    email: data?.data?.email || "",
    password: "",
    avatar: data.data?.avatar || "",
  });

  const [form, setForm] = useState(initialForm);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (data?.data) {
      const newInitialForm = {
        name: data.data.name,
        email: data.data.email,
        password: "",
        avatar: data.data?.avatar || "",
      };
      setInitialForm(newInitialForm);
      setForm(newInitialForm);
    }
  }, [data]);

  // Track changes to enable/disable the Update button
  useEffect(() => {
    if (data?.data) {
      const isFormModified =
        form.name !== initialForm.name || form.email !== initialForm.email;
      setIsModified(isFormModified);
    }
  }, [form, initialForm, data]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setForm(initialForm);
  };

  return isLoading ? (
    <div className="h-[calc(100vh_-_80px)] flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
    </div>
  ) : (
    <section className="max-w-[1280px] mx-auto mt-10">
      <div className="bg-white rounded-2xl px-4 py-8 sm:p-10">
        <h1 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
          <FaRegUserCircle /> Account Preferences
        </h1>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-10">
          <div className="w-full max-w-[500px]">
            <div className="flex items-center gap-6">
              <img
                className="size-24 sm:size-28 object-cover"
                src={defaultAvatar}
                alt=""
              />

              <div className="space-y-4">
                <button className="flex items-center gap-2 cursor-pointer text-primary border border-primary px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium">
                  <AiOutlinePicture className="text-base" /> Change
                </button>
                <button className="flex items-center gap-2 cursor-pointer text-primary hover:text-primary/85 border border-primary px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium">
                  <RiDeleteBinLine className="text-base" /> Remove
                </button>
              </div>
            </div>

            <form className="mt-8 w-full">
              <div className="mb-5">
                <p className="flex items-center gap-2">
                  <FiUser className="text-lg" />
                  Full Name
                </p>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="border outline-none px-4 py-2.5 focus:border-primary duration-300 rounded-lg mt-2 w-full text-sm"
                />
              </div>
              <div>
                <p className="flex items-center gap-2">
                  <AiOutlineMail className="text-lg" />
                  Email Address
                </p>
                <input
                  type="text"
                  name="email"
                  readOnly
                  disabled
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="border outline-none px-4 py-2.5 focus:border-primary duration-300 rounded-lg mt-2 w-full text-sm disabled:cursor-not-allowed"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  disabled={!isModified}
                  onClick={handleCancel}
                  className="text-sm sm:text-base cursor-pointer px-4 sm:px-8 py-2 border rounded-lg border-primary text-primary font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`text-sm sm:text-base px-4 sm:px-8 py-2 border rounded-lg font-medium text-white ${
                    isModified ? "bg-primary cursor-pointer" : "bg-primary/60"
                  }`}
                  disabled={!isModified}
                >
                  Update
                </button>
              </div>
            </form>
          </div>

          <ChangePassword />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
