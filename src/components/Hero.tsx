import { Carousel } from "antd";
import { Link } from "react-router";
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";

const Hero = () => {
  return (
    <Carousel
      className="w-full max-width mt-10 sm:mt-20 "
      effect="fade"
      autoplay
      dotPosition="left"
      adaptiveHeight
    >
      {/* Slide - 1 */}
      <div className="w-full flex! flex-col md:flex-row gap-10 justify-between items-center ml-4">
        <div className="w-full">
          <img src={hero1} className="w-full" alt="hero 1" />
        </div>
        <div className="w-full">
          <h3 className="text-primary text-[25px] leading-8 md:leading-16 md:text-[50px] lg:text-[70px] lg:leading-20 font-black uppercase mb-2">
            A Pollution Free Ride
          </h3>
          <p className="text-sm sm:text-lg">
            Always back your scooter into the curb and sit where you can see it.
            The sound of the throttle makes me fall in love with our bike. King
            of the bikes.
          </p>
          <Link to={"/shop"}>
            <button className="mt-4 md:mt-10 bg-white text-primary border border-primary py-2 md:py-4 px-5 md:px-10 rounded-full font-semibold text-sm md:text-lg tracking-wider cursor-pointer hover:bg-primary hover:text-white duration-300 uppercase">
              Explore Now
            </button>
          </Link>
        </div>
      </div>

      {/* Slide - 2 */}
      <div className="w-full flex! flex-col md:flex-row gap-10 justify-between items-center ml-4">
        <div className="w-full">
          <img src={hero2} alt="hero 1" />
        </div>
        <div className="w-full">
          <h3 className="text-primary text-[25px] leading-8 md:leading-16 md:text-[50px] lg:text-[70px] lg:leading-20 font-black uppercase mb-2">
            RIDES MADE BETTER
          </h3>
          <p className="text-sm sm:text-lg">
            Believe in your cycle, and it will lead your way. The best rides
            happen on two wheels. Ride it like a pro it’s not just riding, it’s
            a feeling. Ride and live today.
          </p>
          <Link to={"/shop"}>
            <button className="mt-4 md:mt-10 bg-white text-primary border border-primary py-2 md:py-4 px-5 md:px-10 rounded-full font-semibold text-sm md:text-lg tracking-wider cursor-pointer hover:bg-primary hover:text-white duration-300 uppercase">
              Explore Now
            </button>
          </Link>
        </div>
      </div>

      {/* Slide - 3 */}
      <div className="w-full flex! flex-col md:flex-row gap-10 justify-between items-center ml-4">
        <div className="w-full">
          <img className="w-full" src={hero3} alt="hero 1" />
        </div>
        <div className="w-full">
          <h3 className="text-primary text-[25px] leading-8 md:leading-16 md:text-[50px] lg:text-[70px] lg:leading-20 font-black uppercase mb-2">
            Experience new ride
          </h3>
          <p className="text-sm sm:text-lg">
            Four wheels move the body, and two wheels move the soul. If you have
            never owned one, you will never understand. A bike on the road is
            worth two in the shed.
          </p>
          <Link to={"/shop"}>
            <button className="mt-4 md:mt-10 bg-white text-primary border border-primary py-2 md:py-4 px-5 md:px-10 rounded-full font-semibold text-sm md:text-lg tracking-wider cursor-pointer hover:bg-primary hover:text-white duration-300 uppercase">
              Explore Now
            </button>
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Hero;
