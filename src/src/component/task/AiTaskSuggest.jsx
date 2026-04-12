import {
  Drawer,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import { useState } from "react";
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
      {" "}
      <TextField
        select
        size="small"
        value={aiCategory}
        onChange={handleSuggestionCategory}
        sx={{ minWidth: 180 }}
      >
        {" "}
        <MenuItem value="">Select Category</MenuItem>{" "}
        {categoryList.map((val, idx) => (
          <MenuItem key={idx} value={val}>
            {" "}
            {val}{" "}
          </MenuItem>
        ))}{" "}
      </TextField>{" "}
      {error && (
        <Typography color="error" variant="body2">
          {" "}
          {error}{" "}
        </Typography>
      )}{" "}
      <Button
        variant="outlined"
        onClick={handleAISuggestion}
        disabled={isSuggesting || !aiCategory}
        sx={{ px: 3, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
      >
        {" "}
        {isSuggesting ? "Thinking..." : "Suggest 🤖"}{" "}
      </Button>{" "}
      {/* Drawer */}{" "}
      <Drawer anchor="right" open={drawerOpen}>
        {" "}
        <Box
          sx={{
            width: 320,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <Box>
            {" "}
            <Typography variant="h6">🤖 AI Suggestion</Typography>{" "}
            <Paper sx={{ mt: 3, p: 2 }}>
              {" "}
              <Typography>{suggestion}</Typography>{" "}
            </Paper>{" "}
          </Box>{" "}
          <Stack spacing={2}>
            {" "}
            <Button variant="contained" onClick={addSuggestedTask}>
              {" "}
              Add to Tasks{" "}
            </Button>{" "}
            <Button variant="outlined" onClick={cancelSuggestedTask}>
              {" "}
              Cancel{" "}
            </Button>{" "}
          </Stack>{" "}
        </Box>{" "}
      </Drawer>{" "}
      {isSuggesting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          {" "}
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            {" "}
            <Typography variant="h6">🤖 Thinking...</Typography>{" "}
          </Paper>{" "}
        </Box>
      )}{" "}
    </>
  );
}
