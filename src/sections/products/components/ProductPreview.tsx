import { Box, Chip, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { CommonSlideProps, IProductFormData } from "../../../types/Product";
import { currencyFormatter, randomId, transformImageUrl } from "./common";
import { useEffect, useState } from "react";
import AddImageDialog from "./AddImageDialog";
import CustomImage from "../../../components/CustomImage";
import UseDroppable from "./dnd-kit/useDroppable";
import { useFormContext } from "react-hook-form";

type Props = Partial<IProductFormData> & {
  loading?: boolean;
};
const ProductPreview = (props: Props) => {
  const {
    title,
    mrp,
    listPrice,
    dealPrice,
    images = [],
    loading = false,
  } = props;
  console.log("images", images);

  const [imageList, setImageList] = useState<CommonSlideProps[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<CommonSlideProps | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const {
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const toggleDialog = (item?: CommonSlideProps) => {
    setSelectedImage(item ?? null);
    setOpen(!open);
  };

  const handleImages = (items: CommonSlideProps[]) => {
    const updatedImages = items.map((item) => item.thumbnailUrl);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const handleSubmit = (data: string) => {
    if (selectedImage) {
      const index = selectedImage?.uniqueId?.split("_")[0];
      setValue(`images.${index}`, data, { shouldValidate: true });
    } else {
      setValue("images", [...images, data], { shouldValidate: true });
    }
    setOpen(false);
  };

  useEffect(() => {
    if (images && images.length) {
      setSelectedPreview(images[0]);
    }
    const transformedImages = images.map((image, index) => ({
      uniqueId: `${index}_${randomId()}`,
      thumbnailUrl: transformImageUrl(image, 150),
    }));
    setImageList(transformedImages);
  }, [images]);

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ p: 3 }}>
          <Stack spacing={2}>
            {images && images.length ? (
              <CustomImage
                src={transformImageUrl(selectedPreview, 600)}
                alt=""
                sx={{ maxWidth: "100%", height: "auto", borderRadius: 1 }}
              />
            ) : (
              <Skeleton
                sx={{ width: "100%", height: 280 }}
                animation={loading ? "wave" : false}
              />
            )}
            <Box
              sx={{
                p: 2,
                border: "2px dashed",
                borderRadius: 1,
              }}
            >
              <UseDroppable
                items={imageList}
                handleItems={handleImages}
                toggleDialog={toggleDialog}
                overFlow={true}
                handleOnClick={(item) => {
                  setSelectedPreview(item?.thumbnailUrl ?? "");
                }}
              />
            </Box>
          </Stack>
          {isSubmitted && errors?.images?.message && (
            <Typography variant="body2" color="error">
              {errors.images.message as string}
            </Typography>
          )}
          <Stack spacing={3} marginTop={2}>
            {title ? (
              <Typography variant="subtitle1">{title}</Typography>
            ) : (
              <Skeleton
                sx={{ width: "100%", height: 40 }}
                animation={loading ? "wave" : false}
              />
            )}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              {mrp ? (
                <Typography variant="body1">
                  M.R.P. :&nbsp;
                  <Box component="span" sx={{ textDecoration: "line-through" }}>
                    {currencyFormatter.format(mrp)}
                  </Box>
                </Typography>
              ) : (
                <Skeleton
                  sx={{ width: "50%" }}
                  animation={loading ? "wave" : false}
                />
              )}
              {listPrice ? (
                <Typography variant="body1">
                  List Price : {currencyFormatter.format(listPrice)}
                </Typography>
              ) : (
                <Skeleton
                  sx={{ width: "50%" }}
                  animation={loading ? "wave" : false}
                />
              )}
            </Stack>
            {dealPrice ? (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ border: "1px solid", borderRadius: 1, p: 1 }}
              >
                <Typography variant="h6">
                  Deal Price : {currencyFormatter.format(dealPrice)}
                </Typography>
                {mrp && dealPrice ? (
                  <Chip
                    color="primary"
                    label={`-${Math.abs(
                      Math.round((Number(dealPrice) / Number(mrp)) * 100 - 100)
                    )}%`}
                    sx={{
                      fontWeight: 700,
                    }}
                  />
                ) : null}
              </Stack>
            ) : (
              <Skeleton
                sx={{ width: "100%", height: 56 }}
                animation={loading ? "wave" : false}
              />
            )}
          </Stack>
        </Box>
      </Paper>
      {open && (
        <AddImageDialog
          open={open}
          onSubmit={handleSubmit}
          onClose={toggleDialog}
          selectedImage={selectedImage}
        />
      )}
    </>
  );
};

export default ProductPreview;
