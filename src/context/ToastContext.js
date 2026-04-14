import { Box, Snackbar, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { createContext } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const theme = useTheme();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box
          sx={{
            minWidth: 360,
            maxWidth: 520,
            px: 3,
            py: 2,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: "#334c8d",
            color: "#ffffff",
            borderLeft: "6px solid",
            borderColor: toast.severity === "success" ? "#1db5c7" : "#ef4444",

            // ✨ premium shadow
            boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* LABEL */}
          <Box
            sx={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              px: 1.5,
              py: 0.5,
              borderRadius: 1.5,
              background:
                toast.severity === "success"
                  ? "rgba(29,181,199,0.15)"
                  : "rgba(239,68,68,0.15)",
              color: toast.severity === "success" ? "#1db5c7" : "#ef4444",
            }}
          >
            {toast.severity.toUpperCase()}
          </Box>

          {/* MESSAGE */}
          <Box
            sx={{
              fontSize: "0.95rem",
              fontWeight: 500,
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            {toast.message}
          </Box>
        </Box>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
