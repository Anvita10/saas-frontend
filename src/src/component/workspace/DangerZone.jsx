import {
  Typography,
  Button,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CloseIcon from "@mui/icons-material/Close";

function DangerZone({ workspaceId }) {
  const apiClient = useApiClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiClient(`/workspaces/${workspaceId}`, { method: "DELETE" });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <WarningRoundedIcon sx={{ color: "#dc2626", fontSize: "1.8rem" }} />
          <Typography
            sx={{ fontSize: "1.25rem", fontWeight: 900, color: "#991b1b" }}
          >
            Delete Workspace
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: "1.05rem",
            color: "#b91c1c",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          This will permanently remove all data. This action is irreversible.
        </Typography>

        <Button
          // REMOVE: color="error" (This is likely what's forcing the teal/theme color)
          variant="contained"
          disableElevation
          onClick={() => setOpen(true)}
          sx={{
            // USE RAW CSS PROPERTIES TO OVERRIDE THEME
            background: "#dc2626 !important",
            backgroundColor: "#dc2626 !important",
            color: "#ffffff !important",

            // TYPOGRAPHY & SHAPE
            fontWeight: 800,
            fontSize: "1.1rem",
            textTransform: "none",
            borderRadius: "12px",
            py: 1.5,
            width: "100%",

            // HOVER FIX
            "&:hover": {
              background: "#b91c1c !important",
              backgroundColor: "#b91c1c !important",
              boxShadow: "0 8px 16px rgba(220, 38, 38, 0.25)",
            },

            // ACTIVE/FOCUS STATE
            "&:active": {
              background: "#991b1b !important",
            },
          }}
        >
          Delete Workspace
        </Button>
      </Stack>

      {/* SaaS STYLE CONFIRMATION MODAL */}
      <Dialog
        open={open}
        onClose={() => !loading && setOpen(false)}
        PaperProps={{
          sx: { borderRadius: "20px", padding: 1, maxWidth: "450px" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pr: 2,
          }}
        >
          <Typography
            sx={{ fontWeight: 900, fontSize: "1.3rem", color: "#1e293b" }}
          >
            Confirm Workspace Deletion
          </Typography>
          <IconButton onClick={() => setOpen(false)} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              bgcolor: "#fef2f2",
              p: 2,
              borderRadius: "12px",
              border: "1px solid #fee2e2",
              mb: 2,
            }}
          >
            <Typography
              sx={{ color: "#991b1b", fontWeight: 700, fontSize: "1rem" }}
            >
              Warning: This action is irreversible.
            </Typography>
          </Box>
          <Typography
            sx={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            By confirming, you will lose all access to tasks, files, and member
            data associated with this workspace.
            <strong>
              {" "}
              Please make sure you have backed up any necessary information.
            </strong>
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setOpen(false)}
            disabled={loading}
            sx={{
              borderRadius: "10px",
              fontWeight: 700,
              color: "#64748b",
              borderColor: "#e2e8f0",
              textTransform: "none",
              "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleDelete}
            disabled={loading}
            startIcon={!loading && <DeleteForeverIcon />}
            sx={{
              borderRadius: "10px",
              fontWeight: 800,
              textTransform: "none",
              py: 1.2,

              // 1. FORCE RED BY KILLING GRADIENTS
              background: "#dc2626 !important",
              backgroundColor: "#dc2626 !important",
              backgroundImage: "none !important", // This kills the teal gradient
              color: "#ffffff !important",

              // 2. STOP TEAL GLOW/SHADOWS
              boxShadow: "none !important",

              "&:hover": {
                background: "#b91c1c !important",
                backgroundColor: "#b91c1c !important",
                backgroundImage: "none !important",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4) !important",
              },

              "&.Mui-disabled": {
                background: "#fecaca !important",
                backgroundColor: "#fecaca !important",
                backgroundImage: "none !important",
                color: "#f87171 !important",
              },
            }}
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DangerZone;
