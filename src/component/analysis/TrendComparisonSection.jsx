import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Chip,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RemoveIcon from "@mui/icons-material/Remove";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import useApiClient from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";

// Centralized style imports
import {
  CARD_STYLES,
  CARD_HOVER,
  HEADER_TEXT,
  SUB_TEXT,
  ANALYSIS_COLORS,
  getInsightTheme,
} from "../../theme/commonStyle";

const TrendComparisonSection = () => {
  const { workspaceId } = useParams();
  const apiClient = useApiClient();
  const theme = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        setLoading(true);
        const res = await apiClient(`/ai-suggest/${workspaceId}/comparison`);
        setData(res.data);
      } catch (err) {
        console.error("Trend fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrend();
  }, [apiClient, workspaceId]);

  const getTrendConfig = (w1, w2, label) => {
    const isHigherBetter = label !== "Overdue Tasks" && label !== "Dropped";
    const improved = w2 > w1;

    if (w1 === w2)
      return {
        icon: <RemoveIcon />,
        label: "Stable",
        color: "#64748b",
        bg: "#f1f5f9",
      };

    if (improved) {
      const themeConfig = isHigherBetter
        ? ANALYSIS_COLORS.success
        : ANALYSIS_COLORS.critical;
      return {
        icon: <TrendingUpIcon />,
        label: isHigherBetter ? "Improved" : "Increased Risk",
        color: themeConfig.main,
        bg: themeConfig.bg,
      };
    }

    // Downward Trend
    const themeConfig = isHigherBetter
      ? ANALYSIS_COLORS.critical
      : ANALYSIS_COLORS.success;
    return {
      icon: <TrendingDownIcon />,
      label: isHigherBetter ? "Declined" : "Improved",
      color: themeConfig.main,
      bg: themeConfig.bg,
    };
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* --- HERO HEADER --- */}
      <Box
        sx={{
          p: 4,
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.05) 40%, rgba(29, 181, 199, 0.1) 100%)",
          border: "1px solid #e2e8f0",
          mb: 4,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <ShowChartIcon
            sx={{ color: theme.palette.primary.main, fontSize: 32 }}
          />
          <Typography variant="h5" sx={HEADER_TEXT}>
            Weekly Trend Comparison
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ ...SUB_TEXT, maxWidth: "600px" }}>
          Analyzing performance shifts between <b>Week 1</b> and <b>Week 2</b>{" "}
          to track team velocity and operational health.
        </Typography>
      </Box>

      {loading && (
        <Box
          mt={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <CircularProgress
            thickness={5}
            size={50}
            sx={{ color: theme.palette.primary.main }}
          />
          <Typography sx={SUB_TEXT}>Crunching the numbers...</Typography>
        </Box>
      )}

      {data && !loading && (
        <>
          <Grid container spacing={3}>
            {[
              {
                label: "Completed Tasks",
                w1: data.weekly.week1.completedTasks,
                w2: data.weekly.week2.completedTasks,
              },
              {
                label: "Active Tasks",
                w1: data.weekly.week1.activeTasks,
                w2: data.weekly.week2.activeTasks,
              },
              {
                label: "Overdue Tasks",
                w1: data.weekly.week1.overdueTasks,
                w2: data.weekly.week2.overdueTasks,
              },
              {
                label: "Completion Rate",
                w1: `${data.weekly.week1.completionRate.toFixed(1)}%`,
                w2: `${data.weekly.week2.completionRate.toFixed(1)}%`,
              },
            ].map((item, idx) => {
              const trend = getTrendConfig(
                parseFloat(item.w1),
                parseFloat(item.w2),
                item.label,
              );
              return (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Paper
                    sx={{
                      ...CARD_STYLES,
                      ...CARD_HOVER,
                      p: 3,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ ...SUB_TEXT, textTransform: "uppercase" }}
                    >
                      {item.label}
                    </Typography>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-end"
                      mt={2}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          W1: {item.w1}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ ...HEADER_TEXT, lineHeight: 1 }}
                        >
                          {item.w2}
                        </Typography>
                      </Box>

                      <Chip
                        icon={trend.icon}
                        label={trend.label}
                        size="small"
                        sx={{
                          bgcolor: trend.bg,
                          color: trend.color,
                          fontWeight: 700,
                          "& .MuiChip-icon": { color: trend.color },
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "4px",
                        bgcolor: trend.color,
                        opacity: 0.3,
                      }}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* INSIGHTS SECTION */}
          <Box mt={6}>
            <Typography
              variant="h6"
              sx={{
                ...HEADER_TEXT,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AutoAwesomeIcon sx={{ color: theme.palette.primary.main }} />
              Trend Insights
            </Typography>

            <Grid container spacing={2}>
              {data.trends?.map((t, i) => {
                const insightStyle = getInsightTheme(t); // Automatically detects 🔴, 🟡, 🟢
                return (
                  <Grid item xs={12} key={i}>
                    <Paper
                      sx={{
                        ...CARD_STYLES,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        background: insightStyle.bg,
                        borderColor: insightStyle.border,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "translateX(8px)" },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: insightStyle.main,
                          color: "#fff",
                          width: 32,
                          height: 32,
                        }}
                      >
                        <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={insightStyle.text}
                      >
                        {t}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TrendComparisonSection;
