import { Stack, LinearProgress } from "@mui/material";

type Props = {
  height?: number | string;
};

const LoadingScreen = ({ height = 240 }: Props) => (
  <Stack
    sx={{ height: height ?? 1, width: 1 }}
    justifyContent="center"
    alignItems="center"
  >
    <LinearProgress sx={{ width: "50%" }} />
  </Stack>
);

export default LoadingScreen;
