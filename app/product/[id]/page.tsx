import { BuyProduct } from "@/app/actions";
import { ProductDescription } from "@/app/components/ProductDescription";
import { BuyButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/utils/db";
import { unstable_noStore as noStore } from "next/cache";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";

const getData = async (id: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      category: true,
      description: true,
      smallDescription: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
};

const page = async ({ params }: { params: { id: string } }) => {
  noStore();
  const data = await getData(params.id);
  return (
    <section className="max-w-7xl mx-auto lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={item as string}
                  alt="Product Image"
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2  lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{data?.smallDescription}</p>
        <form action={BuyProduct}>
          <input type="hidden" name="id" value={data?.id} />
          <BuyButton price={data?.price as number} />
        </form>
        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-gray-500 col-span-1">
              Released:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-Us", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Category:
            </h3>
            <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-10"></div>
      </div>
      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <ProductDescription content={data?.description as JSONContent} />
      </div>
    </section>
  );
};

export default page;
