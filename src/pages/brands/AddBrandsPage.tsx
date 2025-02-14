import AddBrand from "../../sections/brands/addBrand";
import { BrandsPageProps } from "../../type/Schema";

const AddBrandsPage = ({ mode }: BrandsPageProps) => {
  return (
    <>
      <AddBrand mode={mode} />
    </>
  );
};

export default AddBrandsPage;
