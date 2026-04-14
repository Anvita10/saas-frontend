import {
  Typography,
  Stack,
  Avatar,
  Button,
  Box,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useCallback, useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import AddMemberModal from "./AddMemberModal";

function MembersSection({ workspaceId }) {
  const apiClient = useApiClient();
  const [workspace, setWorkspace] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchWorkspace = useCallback(async () => {
    const res = await apiClient(`/workspaces/${workspaceId}`);
    setWorkspace(res.data.workspace);
  }, [apiClient, workspaceId]);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  const handleRemove = async (userId) => {
    if (!window.confirm("Remove this member?")) return;
    try {
      await apiClient(`/workspaces/${workspaceId}/remove-member`, {
        method: "PATCH",
        body: { userId },
      });
      fetchWorkspace();
    } catch (err) {
      console.log(err);
    }
  };

  if (!workspace) return null;

  return (
    <Box sx={{ p: 2 }}>
      {/* HEADER: Action focused */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        px={1}
      >
        <Typography
          sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b" }}
        >
          Current Members ({workspace.members.length})
        </Typography>

        <Button
          variant="contained"
          disableElevation
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => setOpen(true)}
        >
          Add Member
        </Button>
      </Box>

      {/* MEMBER LIST */}
      <Stack spacing={0.5}>
        {workspace.members.map((m, i) => (
          <Box key={i}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: 2,
                borderRadius: "12px",
                transition: "0.2s",
                "&:hover": {
                  bgcolor: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                },
              }}
            >
              {/* LEFT: User Details */}
              <Stack direction="row" spacing={2.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "#e0f2fe",
                    color: "#0369a1",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                  }}
                >
                  {m.userId?.name?.charAt(0)}
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    {m.userId?.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", color: "#64748b" }}>
                    {m.userId?.email}
                  </Typography>
                </Box>
              </Stack>

              {/* RIGHT: Role & Actions */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={m.role}
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    bgcolor: m.role === "admin" ? "#fef3c7" : "#f1f5f9",
                    color: m.role === "admin" ? "#92400e" : "#475569",
                    borderRadius: "6px",
                  }}
                />

                <IconButton
                  onClick={() => handleRemove(m.userId._id)}
                  sx={{
                    color: "#94a3b8",
                    "&:hover": { color: "#ef4444", bgcolor: "#fee2e2" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            {i !== workspace.members.length - 1 && (
              <Divider sx={{ my: 0.5, mx: 2, borderColor: "#f1f5f9" }} />
            )}
          </Box>
        ))}
      </Stack>

      <AddMemberModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchWorkspace}
        workspaceId={workspaceId}
      />
    </Box>
  );
}

export default MembersSection;

