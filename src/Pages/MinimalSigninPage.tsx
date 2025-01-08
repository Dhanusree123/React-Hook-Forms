import {
  Stack,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Box,
  Avatar,
  Link,
  Button,
  TextField,
} from "@mui/material";
import { avatarData } from "../Data/AvatarData";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const MinimalSigninPage = () => {
  const navigate = useNavigate();

  return (
    <Stack>
      <AppBar
        position="relative"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          color: "black",
          margin: "20px",
        }}
      >
        <Toolbar>
          <Stack sx={{ flexGrow: 1, zIndex: 1 }}>
            <IconButton
              sx={{ position: "absolute", top: "-10px", left: "0" }}
              disableRipple
            >
              <img
                src="src\assets\minimals-logo.png"
                alt=""
                style={{ height: "50px" }}
              />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            mr={2}
            zIndex={1}
          >
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Need help?
            </Typography>
            <IconButton
              sx={{
                "& img": {
                  height: "30px",
                  animation: "spin 1s linear infinite",
                  WebkitAnimation: "spin 3s linear infinite",
                },
              }}
            >
              <img src="src\assets\settings-icon.png" alt="settings-button" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Grid container style={{ height: "100vh", position: "absolute" }}>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#F9FAFB",
          }}
        >
          <Box style={{ textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Hi, Welcome back
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="textSecondary"
              fontSize={20}
              gutterBottom
            >
              More effectively with optimized workflows.
            </Typography>
            <img
              src="https://assets.minimals.cc/public/assets/illustrations/illustration-dashboard.webp"
              alt="minimals-img"
              style={{
                height: "450px",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {avatarData.map((avatar, index) => (
                <Avatar
                  key={index}
                  src={avatar.src}
                  alt={avatar.alt}
                  sx={{
                    opacity: avatar.disabled ? 0.5 : 1,
                    pointerEvents: avatar.disabled ? "none" : "auto",
                    filter: avatar.disabled ? "grayscale(100%)" : "none",
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Sign in to your account
            </Typography>
            <Typography variant="body1" gutterBottom>
              Don't have an account?
              <Link
                color="success"
                fontWeight="bold"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                Get started
              </Link>
            </Typography>
            <Box
              style={{
                backgroundColor: "#E6F7F8",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                marginTop: "2rem",
                color: "#00796B",
              }}
            >
              <Typography
                variant="body1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: "6px",
                }}
                gutterBottom
              >
                <InfoIcon color="info" />
                Use <strong>demo@minimals.cc</strong> with password{" "}
                <strong>@2Minimal</strong>
              </Typography>
            </Box>
            <Box component="form" width="31rem">
              <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                margin="normal"
                defaultValue="demo@minimals.cc"
                focused
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    { borderColor: "#021526", borderRadius: "10px" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#021526" },
                }}
              />
              <Box display="flex" justifyContent="flex-end" marginTop="2rem">
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                defaultValue="@2Minimal"
                focused
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    { borderColor: "#021526", borderRadius: "10px" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#021526" },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#021526",
                  color: "#FFF",
                  padding: "0.75rem",
                  textTransform: "none",
                  fontSize: "1rem",
                  marginTop: "1.5rem",
                  borderRadius: "10px",
                  "&:hover": { bgcolor: "#1E3E62" },
                }}
                onClick={() => navigate("/table")}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MinimalSigninPage;
