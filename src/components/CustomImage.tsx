import { Box, type BoxProps } from "@mui/material";

type Props = BoxProps & {
  src: string;
  alt?: string;
};

const CustomImage = (props: Props) => {
  const { src, alt, ...other } = props;
  return (
    <>
      <Box component="img" src={src} alt={alt} {...other} />
    </>
  );
};

export default CustomImage;
