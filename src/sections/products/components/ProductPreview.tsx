import { Box, Skeleton, Typography } from "@mui/material";
import { IProductFormData } from "../../../type/Schema";

type Props = Partial<IProductFormData> & {
  loading?: boolean;
  productData?: IProductFormData | null;
};
const ProductPreview = (props: Props) => {
  const { productData, loading = false } = props;
  const product = productData;

  return (
    <Box sx={{ p: 3 }}>
      {product?.title ? (
        <Typography variant="h6">{product?.title}</Typography>
      ) : (
        <Skeleton
          sx={{ width: "100%", height: 40 }}
          animation={loading ? "wave" : false}
        />
      )}
    </Box>
  );
};

export default ProductPreview;
