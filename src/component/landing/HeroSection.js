import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Fade,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.tokens.gradients.hero,
        position: "relative",
        pt: { xs: 10, md: 18 },
        pb: { xs: 20, md: 32 },
        color: "white",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          left: "10%",
          width: 400,
          height: 400,
          bgcolor: "rgba(29, 181, 199, 0.15)",
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />

      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                letterSpacing: "0.3em",
                color: "#0f172a",
                bgcolor: "#ffffff",
                px: 2,
                py: 0.5,
                borderRadius: 2,
              }}
            >
              PRODUCTIVITY REDEFINED
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.8rem", md: "4.5rem" },
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              Master Your Workflow. <br />
              <Box component="span" sx={{ color: "#1db5c7" }}>
                Together.
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.8)",
                maxWidth: "700px",
              }}
            >
              The all-in-one workspace for teams to track tasks, collaborate in
              real-time, and ship products faster.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/signup")}
              >
                Start Building — It's Free
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  borderWidth: "1.5px",
                  color: "#fff", // important for dark background
                  borderColor: "rgba(255,255,255,0.6)",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Fade>
      </Container>
    </Box>
  );
}
