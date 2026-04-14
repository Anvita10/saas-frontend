import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1db5c7",
      dark: "#0f172a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0f172a",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",

    fontSize: 17,

    h1: {
      fontWeight: 900,
      letterSpacing: "-0.04em",
      fontSize: "2.8rem",
    },

    h4: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
      fontSize: "2.2rem",
    },

    h5: {
      fontWeight: 800,
      fontSize: "1.5rem", // ⬆ used in cards (important!)
    },

    h6: {
      fontWeight: 700,
      letterSpacing: "0.02em",
      fontSize: "1.15rem",
    },

    body1: {
      fontSize: "1.05rem", // ⬆ readable paragraphs
      lineHeight: 1.6,
    },

    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.5,
    },

    caption: {
      fontSize: "0.8rem",
      letterSpacing: "0.08em",
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.02em",
      fontSize: "1rem",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "52px",
          padding: "12px 28px",
          borderRadius: 12,
          fontSize: "1rem",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
          },
          "&.Mui-disabled": {
            background: "#e2e8f0",
            color: "#64748b",
            boxShadow: "none",
            opacity: 1,
            cursor: "not-allowed",
            pointerEvents: "auto",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
          boxShadow: "0 8px 16px -4px rgba(29, 181, 199, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #1e293b 0%, #22d3ee 100%)",
            boxShadow: "0 12px 20px -4px rgba(29, 181, 199, 0.4)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "56px",
          borderRadius: 14,
          fontSize: "1rem",
          backgroundColor: "#fcfdfe",

          "& fieldset": {
            borderColor: "#e2e8f0",
          },
          "&:hover fieldset": {
            borderColor: "#cbd5e1",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1db5c7",
          },
        },
        input: {
          padding: "14px 16px",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem", // ⬆ from 0.85
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "#64748b",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          padding: "20px", // 🔥 more breathing space
          minHeight: "140px", // 🔥 prevents cramped cards
          boxShadow: "0 8px 30px -10px rgba(15,23,42,0.15)",
          transition: "all 0.2s ease",

          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 16px 40px -10px rgba(15,23,42,0.2)",
          },
        },
      },
    },
  },

  tokens: {
    gradients: {
      hero: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
      primaryButton: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
    },
    shadows: {
      soft: "0 30px 60px -12px rgba(0, 0, 0, 0.15)",
      card: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
    },
  },
});

export default theme;
