import { Link } from "react-router";

type TPageBannerProps = {
  title: string;
  pageName: string;
};
const PageBanner = ({ title, pageName }: TPageBannerProps) => {
  return (
    <div className="relative h-[250px] flex flex-col justify-center bg-black">
      <div className="max-width w-full text-white">
        <p className="uppercase font-semibold">
          <Link to={"/"} className="hover:text-primary duration-300">
            Home
          </Link>{" "}
          - <span className="text-primary">{pageName}</span>
        </p>
        <h2 className="text-4xl font-bold mt-3 text-white">{title}</h2>
        <p className="uppercase outlined-text absolute -right-64 top-1/2 -translate-y-1/2 opacity-20 sm:opacity-30 text-nowrap">
          {title}
        </p>
      </div>
    </div>
  );
};

export default PageBanner;
