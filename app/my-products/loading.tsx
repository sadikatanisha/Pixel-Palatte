import { LoadingProductCard } from "../components/ProductCard";

const loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid gird-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
};

export default loading;
