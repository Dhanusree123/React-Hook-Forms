import { Box, Chip, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { IProductFormData } from "../../../type/Schema";
import { currencyFormatter } from "./common";

type Props = Partial<IProductFormData> & {
  loading?: boolean;
};
const ProductPreview = (props: Props) => {
  const { title, mrp, listPrice, dealPrice, loading = false } = props;

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
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
  );
};

export default ProductPreview;
