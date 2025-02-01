import { Link } from "react-router";
import aboutImg from "../assets/images/about-img.avif";
import PageBanner from "../components/PageBanner";

const AboutPage = () => {
  return (
    <>
      <PageBanner pageName="About" title="About us" />

      <section className="bg-gray-100 mt-32">
        <div className="max-width mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-primary-700">
              Your Journey Starts with the Perfect Ride
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              At{" "}
              <span className="text-primary-700 font-semibold">
                Bi-Cycle Store
              </span>
              , we are more than just a bicycle shop—we are a community of
              cycling enthusiasts who believe that every ride brings freedom,
              adventure, and joy.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Whether you're a daily commuter, a mountain trail conqueror, or a
              weekend cruiser, we have the perfect bike for you. Our expert team
              is here to help you find the best fit, accessories, and service to
              enhance your cycling experience.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              With quality bikes, trusted brands, and professional maintenance,
              we ensure your ride is always smooth and enjoyable. Join us and be
              part of a passionate cycling community!
            </p>
            <Link to={"/shop"}>
              <button className="cursor-pointer mt-6 text-primary bg-white border border-gray-200 px-6 py-3 rounded-xl text-lg font-medium transition">
                Explore Our Bikes
              </button>
            </Link>
          </div>

          <div className="lg:w-1/2">
            <img
              src={aboutImg}
              alt="Cycling adventure"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
