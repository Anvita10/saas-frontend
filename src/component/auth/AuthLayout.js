import { Box, Paper, Fade, useTheme } from "@mui/material";

function AuthLayout({ children, maxWidth = 450 }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.tokens.gradients.hero,
        p: 2,
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            width: "100%",
            maxWidth,
            borderRadius: 8,
            bgcolor: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.45)",
          }}
        >
          {children}
        </Paper>
      </Fade>
    </Box>
  );
}

export default AuthLayout;
