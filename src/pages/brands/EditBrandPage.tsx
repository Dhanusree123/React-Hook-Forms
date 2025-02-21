import EditBrand from "../../sections/brands/edit-brand";
import { BrandsPageProps } from "../../types/Schema";

const EditBrandPage = ({ mode }: BrandsPageProps) => {
  return <EditBrand mode={mode} />;
};

export default EditBrandPage;
