import toast from "react-hot-toast";
import { Link } from "react-router";
import PageBanner from "../components/PageBanner";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.error("Improvements are underway, stay tuned!");
  };
  return (
    <div>
      <PageBanner pageName="Contact" title="Contact us" />
      <div className="max-width mt-16">
        <div className="flex flex-wrap md:flex-nowrap gap-5">
          <div className="w-full md:w-[40%] py-10 px-8 bg-primary/5 shadow rounded-lg">
            <h1 className="font-bold mb-2 text-lg">CONTACT INFO</h1>
            <p>
              We’d love to hear from you! Whether you have inquiries, feedback,
              or need support, feel free to contact us, and we’ll be happy to
              assist you.
            </p>
            <div className="mt-4 flex gap-4 items-start">
              <span className="text-primary">Address :</span>
              <p>123 Sky Tower, Los Angeles, USA</p>
            </div>
            <div className="flex gap-4 items-start my-2">
              <span className="text-primary">Phone :</span>
              <Link to={"tel:(012)3456789"}>(012) 345 6789</Link>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-primary">Email :</span>
              <p>info@bicyclestore.com</p>
            </div>
          </div>
          <div className="w-full md:w-[60%] bg-white py-10 px-6 sm:p-10 rounded-lg shadow">
            <h1 className="mb-5 font-bold">LEAVE US A MESSAGE</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-y-5 justify-between"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full sm:w-[49%] border border-gray-400 outline-none p-2 rounded-lg placeholder:text-sm px-4"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full sm:w-[49%] border border-gray-400 outline-none p-2 rounded-lg placeholder:text-sm px-4"
              />
              <input
                type="url"
                name="website"
                placeholder="Website"
                className="w-full border border-gray-400 outline-none p-2 rounded-lg placeholder:text-sm px-4"
              />
              <textarea
                name="comment"
                placeholder="Comment"
                className="w-full border border-gray-400 outline-none p-2 rounded-lg resize-none h-[150px] placeholder:text-sm px-4"
              ></textarea>
              <button
                type="submit"
                className="cursor-pointer w-full bg-primary text-white font-medium outline-none p-3 rounded-lg"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
