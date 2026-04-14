export const CARD_STYLES = {
  borderRadius: "20px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
};

export const CARD_HOVER = {
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    transform: "translateY(-2px)",
  },
};

export const SECTION_PADDING = {
  p: 3,
};

export const HEADER_TEXT = {
  fontWeight: 800,
  color: "#0f172a",
};

export const SUB_TEXT = {
  color: "#64748b",
  fontWeight: 500,
};

export const INPUT_STYLE = {
  "& .MuiOutlinedInput-root": {
    height: "48px",
    borderRadius: "12px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "#e2e8f0" },
  },
};

export const STATUS_CONFIG = {
  completed: { color: "#10b981", bg: "#ecfdf5" },
  "in-progress": { color: "#3b82f6", bg: "#eff6ff" },
  pending: { color: "#f59e0b", bg: "#fffbeb" },
  todo: { color: "#64748b", bg: "#f8fafc" },
  rejected: { color: "#ef4444", bg: "#fef2f2" },
};

export const getStatusConfig = (status = "") => {
  return (
    STATUS_CONFIG[status.toLowerCase()] || {
      color: "#94a3b8",
      bg: "#f1f5f9",
    }
  );
};

export const getPriorityColor = (priority) => {
  const p = priority?.toLowerCase();

  if (p === "high") return "#ef4444";
  if (p === "medium") return "#f59e0b";
  if (p === "low") return "#10b981";

  return "#94a3b8";
};
