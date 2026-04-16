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
import useApiClient from "../../hooks/useApiClient";
import { useNavigate, useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  CalendarToday,
  AutoAwesome,
  TrendingUp,
  Group,
  ListAlt,
  Timer,
} from "@mui/icons-material";

// Import centralized styles and the new theme helper
import {
  CARD_STYLES,
  CARD_HOVER,
  HEADER_TEXT,
  SUB_TEXT,
  ANALYSIS_COLORS,
  getInsightTheme,
} from "../../theme/commonStyle";

const AnalysisSection = () => {
  const { workspaceId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiClient = useApiClient();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const res = await apiClient(`/ai-suggest/${workspaceId}`);
        setAnalysis(res.data);
      } catch (err) {
        console.error("Error fetching analysis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [apiClient, workspaceId]);

  const chartData = analysis
    ? [
        {
          name: "Completed",
          value: analysis.analytics.completedTasks,
          color: ANALYSIS_COLORS.success.main,
        },
        {
          name: "Active",
          value: analysis.analytics.activeTasks,
          color: "#3b82f6",
        },
        {
          name: "Dropped",
          value: analysis.analytics.rejectedTasks,
          color: ANALYSIS_COLORS.critical.main,
        },
        {
          name: "Overdue",
          value: analysis.analytics.overdueTasks,
          color: ANALYSIS_COLORS.warning.main,
        },
      ]
    : [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <Paper
          sx={{
            ...CARD_STYLES,
            p: 2,
            background: data.payload.color,
            color: "white",
            border: "none",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {data.value}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* --- HERO HEADER --- */}
      <Box
        sx={{
          p: 4,
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(29, 181, 199, 0.15) 0%, rgba(15, 23, 42, 0.05) 40%, rgba(168, 85, 247, 0.1) 100%)",
          border: "1px solid #e2e8f0",
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <AutoAwesome
                sx={{ color: theme.palette.primary.main, fontSize: 32 }}
              />
              <Typography variant="h5" sx={HEADER_TEXT}>
                AI Workspace Intelligence
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ ...SUB_TEXT, maxWidth: "600px" }}>
              Comprehensive performance analysis covering activity from the{" "}
              <b>last 7 days</b>. Review your team's velocity and bottleneck
              insights.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              icon={
                <CalendarToday
                  sx={{
                    fontSize: "12px !important",
                    color: theme.palette.primary.main,
                  }}
                />
              }
              label="Last 7 Days"
              variant="outlined"
              sx={{
                borderRadius: "6px",
                fontWeight: 500,
                bgcolor: "#fff",
                borderColor: "#e2e8f0",
              }}
            />
            <Box
              onClick={() => navigate(`/workspace/${workspaceId}/comparison`)}
              sx={{
                px: 2,
                py: 1,
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "0.85rem",
                color: "#fff",
                background: ANALYSIS_COLORS.info.gradient,
                boxShadow: "0 6px 16px rgba(29,181,199,0.25)",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px rgba(29,181,199,0.35)",
                },
              }}
            >
              📊 Compare Trends
            </Box>
          </Box>
        </Box>
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
          <Typography sx={SUB_TEXT}>
            AI is decoding your workflow patterns...
          </Typography>
        </Box>
      )}

      {analysis && !loading && (
        <>
          {/* --- STATS GRID --- */}
          <Grid container spacing={3}>
            {[
              {
                label: "Total Tasks",
                value: analysis.analytics.totalTasks,
                sub: "Total scope",
                icon: <ListAlt />,
                color: ANALYSIS_COLORS.info.main,
              },
              {
                label: "Completed",
                value: analysis.analytics.completedTasks,
                sub: "Last 7 days",
                icon: <TrendingUp />,
                color: ANALYSIS_COLORS.success.main,
              },
              {
                label: "Active",
                value: analysis.analytics.activeTasks,
                sub: "Current load",
                icon: <Group />,
                color: "#3b82f6",
              },
              {
                label: "Dropped",
                value: analysis.analytics.rejectedTasks,
                sub: "Canceled",
                icon: <ListAlt />,
                color: ANALYSIS_COLORS.critical.main,
              },
              {
                label: "Completion Rate",
                value: `${analysis.analytics.completionRate.toFixed(1)}%`,
                sub: "Efficiency",
                icon: <TrendingUp />,
                color: "#a855f7",
              },
              {
                label: "Overdue",
                value: analysis.analytics.overdueTasks,
                sub: "Immediate attention",
                icon: <Timer />,
                color: ANALYSIS_COLORS.warning.main,
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    ...CARD_STYLES,
                    ...CARD_HOVER,
                    p: 3,
                    position: "relative",
                    borderColor: `${item.color}20`,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar
                      sx={{
                        background: `${item.color}15`,
                        color: item.color,
                        width: 36,
                        height: 36,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          ...SUB_TEXT,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="h4" sx={{ ...HEADER_TEXT, mt: 0.5 }}>
                        {item.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.sub}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "10%",
                      width: "80%",
                      height: "3px",
                      background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                      opacity: 0.5,
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* --- CHART & INSIGHTS --- */}
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} lg={7}>
              <Typography
                variant="h6"
                sx={{
                  ...HEADER_TEXT,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                📊 Task Distribution{" "}
                <Typography variant="caption" sx={SUB_TEXT}>
                  (7 Day Window)
                </Typography>
              </Typography>
              <Paper sx={{ ...CARD_STYLES, p: 3, height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={50}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Typography variant="h6" sx={{ ...HEADER_TEXT, mb: 2 }}>
                🧠 Smart Observations
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {analysis.insights.map((insight, index) => {
                  const insightStyle = getInsightTheme(insight); // Using the helper
                  return (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background: insightStyle.gradient,
                          boxShadow: "0 4px 12px rgba(15,23,42,0.1)",
                        }}
                      >
                        <AutoAwesome sx={{ fontSize: 18, color: "#fff" }} />
                      </Avatar>
                      <Paper
                        sx={{
                          ...CARD_STYLES,
                          p: 2,
                          flex: 1,
                          border: `1px solid ${insightStyle.border}`,
                          background: insightStyle.bg,
                          color: insightStyle.text,
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "translateX(5px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {insight}
                        </Typography>
                      </Paper>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AnalysisSection;

