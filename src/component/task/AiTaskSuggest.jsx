import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Stack,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import useApiClient from "../../hooks/useApiClient";

export default function AiTaskSuggest({ categoryList, onAddTask }) {
  const [aiCategory, setAiCategory] = useState("");
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const apiClient = useApiClient();

  const handleSuggestionCategory = (e) => {
    setError("");
    setAiCategory(e.target.value);
  };

  const handleAISuggestion = async () => {
    if (!aiCategory) {
      setError("Please select AI category");
      return;
    }
    setIsSuggesting(true);
    try {
      const res = await apiClient("/tasks/ai-suggest", {
        method: "POST",
        body: { category: aiCategory },
      });
      if (res?.suggestion) {
        setSuggestion(res.suggestion);
        setDrawerOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  };

  const addSuggestedTask = async () => {
    try {
      await onAddTask({ title: suggestion, category: aiCategory });
      setSuggestion("");
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  function cancelSuggestedTask() {
    setSuggestion("");
    setDrawerOpen(false);
  }

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="flex-start">
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="AI Category"
            value={aiCategory}
            onChange={handleSuggestionCategory}
            error={Boolean(error)}
            helperText={error}
            sx={{
              minWidth: 200,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categoryList.map((val, idx) => (
              <MenuItem key={idx} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          onClick={handleAISuggestion}
          disabled={isSuggesting || !aiCategory}
          startIcon={!isSuggesting && <AutoAwesomeIcon />}
          sx={{
            height: 40,
            px: 3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            background: "linear-gradient(45deg, #6366f1 30%, #a855f7 90%)",
            boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
            "&:hover": {
              background: "linear-gradient(45deg, #4f46e5 30%, #9333ea 90%)",
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.23)",
            },
          }}
        >
          {isSuggesting ? <CircularProgress size={20} color="inherit" /> : "Suggest"}
        </Button>
      </Stack>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={cancelSuggestedTask}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 }, borderRadius: "16px 0 0 16px" },
        }}
      >
        <Box
          sx={{
            height: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f8fafc",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SmartToyIcon color="primary" />
                <Typography variant="h6" fontWeight="700">
                  AI Suggestion
                </Typography>
              </Stack>
              <IconButton onClick={cancelSuggestedTask} size="small">
                <CloseIcon />
              </IconButton>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Based on the <strong>{aiCategory}</strong> category, we suggest:
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "primary.light",
                backgroundColor: "#ffffff",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  backgroundColor: "primary.main",
                  borderRadius: "4px 0 0 4px",
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontStyle: "italic", lineHeight: 1.6, color: "text.primary" }}
              >
                "{suggestion}"
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ mt: "auto" }}>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={addSuggestedTask}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  boxShadow: "none",
                }}
              >
                Accept and Add Task
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                onClick={cancelSuggestedTask}
                sx={{ borderRadius: 2, textTransform: "none", py: 1.5 }}
              >
                Discard
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>

      {isSuggesting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 5,
              borderRadius: 4,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress size={40} thickness={4} />
            <Box>
              <Typography variant="h6" fontWeight="700">
                AI is Thinking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generating the perfect task for you...
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}