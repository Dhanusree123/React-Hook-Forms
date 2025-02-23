import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import RHFNTextField from "../../components/hook-form/custom-text-field/rhfn-text-field";
import { User } from "../../types/Users";
import { useNavigate } from "react-router-dom";

type DetailsProps = {
  loading: boolean;
  error: string | null;
  user: User | null;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  disabled?: boolean;
};

const Details = ({
  loading,
  error,
  user,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  handleSubmit,
  disabled = false,
}: DetailsProps) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Button variant="contained" onClick={() => navigate("/users")}>
        Back
      </Button>
      <Container maxWidth="sm">
        <Paper sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h4" gutterBottom>
              {disabled ? "Edit User" : "Edit Email"}
            </Typography>
            {loading && <Typography>Loading ...</Typography>}
            {error && <Typography>Error: {error}</Typography>}
            {user && (
              <>
                <RHFNTextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={disabled}
                />

                <RHFNTextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={disabled}
                />

                <RHFNTextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Details;
