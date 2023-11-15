import MetadataParams from "@/types/dinamic-metadata";
import "./style.scss";
import request from "@/server";
import Image from "next/image";
import AllCategoryType from "@/types/all-categories";
import Params from "@/types/dinamic-params";
import ProductsRow from "@/components/shares/products-row";

export async function generateMetadata({
  params: { categoryId },
}: MetadataParams) {
  const { data } = await request.get<AllCategoryType>(`category/${categoryId}`);

  return {
    title: data?.name,
    description: data.name,
  };
}

const AllCategories = async ({ params: { categoryId } }: Params) => {
  const { data } = await request.get<AllCategoryType>(`category/${categoryId}`);
  const {
    data: { total, products },
  } = await request.get<{ total: number; products: AllCategoryType[] }>(
    `product`,
    {
      params: { category: categoryId },
    }
  );
  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ textAlign: "center" }}>
        <Image
          src={data.image.url}
          width={300}
          height={300}
          alt={data.name}
          objectFit="cover"
        />
      </div>
      <h1 style={{ textAlign: "center", marginBlock: "30px" }}>
        {data.name} ({total})
      </h1>
      <ProductsRow products={products} />
    </div>
  );
};

export default AllCategories;
