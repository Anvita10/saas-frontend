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

// --- ANALYSIS & TREND COLORS ---
export const ANALYSIS_COLORS = {
  critical: {
    main: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
    text: "#b91c1c",
    gradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
  },
  warning: {
    main: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    text: "#a16207",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #a16207 100%)",
  },
  success: {
    main: "#10b981",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    text: "#15803d",
    gradient: "linear-gradient(135deg, #10b981 0%, #15803d 100%)",
  },
  info: {
    main: "#1db5c7",
    bg: "#ecfeff",
    border: "#bae6fd",
    text: "#1e293b",
    gradient: "linear-gradient(135deg, #1db5c7 0%, #0f172a 100%)",
  },
};

// --- HELPERS ---

export const getInsightTheme = (text = "") => {
  if (text.includes("🔴") || text.includes("🚨"))
    return ANALYSIS_COLORS.critical;
  if (text.includes("🟡") || text.includes("⚠️"))
    return ANALYSIS_COLORS.warning;
  if (text.includes("🟢")) return ANALYSIS_COLORS.success;
  return ANALYSIS_COLORS.info;
};

export const STATUS_CONFIG = {
  completed: { color: ANALYSIS_COLORS.success.main, bg: "#ecfdf5" },
  "in-progress": { color: "#3b82f6", bg: "#eff6ff" },
  pending: { color: ANALYSIS_COLORS.warning.main, bg: "#fffbeb" },
  todo: { color: "#64748b", bg: "#f8fafc" },
  rejected: { color: ANALYSIS_COLORS.critical.main, bg: "#fef2f2" },
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
  if (p === "high") return ANALYSIS_COLORS.critical.main;
  if (p === "medium") return ANALYSIS_COLORS.warning.main;
  if (p === "low") return ANALYSIS_COLORS.success.main;
  return "#94a3b8";
};

export const INPUT_STYLE = {
  "& .MuiOutlinedInput-root": {
    height: "48px",
    borderRadius: "12px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "#e2e8f0" },
  },
};

