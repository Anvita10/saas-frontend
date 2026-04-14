export const pageWrapper = {
  bgcolor: "#f8fafc",
  minHeight: "100vh",
  p: { xs: 3, md: 5 },
};

export const card = {
  border: "1px solid #e2e8f0",
  bgcolor: "#ffffff",
};

export const hoverCard = {
  ...card,
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    borderColor: "#1db5c7",
    transform: "translateY(-4px)",
    boxShadow: "0 12px 20px -10px rgba(0,0,0,0.08)",
  },
};

export const statCard = {
  ...card,
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 2,
  borderRadius: 2,
};
