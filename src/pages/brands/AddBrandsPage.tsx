import AddBrand from "../../sections/brands/addBrand";
import { BrandsPageProps } from "../../types/Schema";

const AddBrandsPage = ({ mode }: BrandsPageProps) => {
  return (
    <>
      <AddBrand mode={mode} />
    </>
  );
};

export default AddBrandsPage;
