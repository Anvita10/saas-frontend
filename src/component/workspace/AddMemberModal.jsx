import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useToast } from "../../context/ToastContext";

export default function AddMemberModal({ open, onClose, onSuccess }) {
  const apiClient = useApiClient();
  const { workspaceId } = useParams();
  const { showToast } = useToast();

  const [members, setMembers] = useState([{ email: "", role: "member" }]);

  const addRow = () => {
    setMembers((prev) => [...prev, { email: "", role: "member" }]);
  };

  // ❌ Remove row
  const removeRow = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  // ✏️ Update row
  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  // 🚀 Submit all members
  const handleSubmit = async () => {
    try {
      const filtered = members.filter((m) => m.email.trim());

      if (filtered.length === 0) return;

      const res = await apiClient(`/workspaces/${workspaceId}/members`, {
        method: "PATCH",
        body: { members: filtered },
      });

      if (res.success) {
        showToast(res.message, "success");
        onSuccess();
        onClose();
        setMembers([{ email: "", role: "member" }]);
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Team Members</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {members.map((member, index) => (
            <Box key={index} display="flex" gap={2} alignItems="center">
              {/* EMAIL */}
              <TextField
                label="Email"
                fullWidth
                value={member.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
              />

              {/* ROLE */}
              <TextField
                select
                label="Role"
                value={member.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
                sx={{ width: 120 }}
              >
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

              {/* REMOVE */}
              <IconButton
                onClick={() => removeRow(index)}
                disabled={members.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          {/* ADD MORE BUTTON */}
          <Button
            startIcon={<AddIcon />}
            onClick={addRow}
            sx={{
              textTransform: "none",
              alignSelf: "flex-start",
            }}
          >
            Add another member
          </Button>

          {/* ACTIONS */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onClose}>Cancel</Button>

            <Button variant="contained" onClick={handleSubmit}>
              Add Members
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
