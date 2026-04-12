import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import InsightsIcon from "@mui/icons-material/Insights";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#ffffff", overflow: "hidden" }}>
      {/* --- HERO SECTION --- */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
          position: "relative",
          pt: { xs: 10, md: 18 },
          pb: { xs: 20, md: 32 },
          color: "white",
          textAlign: "center",
        }}
      >
        {/* Subtle Brand Glows */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            left: "10%",
            width: 400,
            height: 400,
            bgcolor: "rgba(29, 181, 199, 0.15)",
            filter: "blur(120px)",
            borderRadius: "50%",
          }}
        />

        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Stack spacing={4} alignItems="center">
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "0.3em",
                  color: "#1db5c7",
                  bgcolor: "rgba(255,255,255,0.05)",
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                PRODUCTIVITY REDEFINED
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.8rem", md: "4.5rem" },
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                Master Your Workflow. <br />
                <Box
                  component="span"
                  sx={{
                    color: "#1db5c7",
                    textShadow: "0 0 30px rgba(29, 181, 199, 0.3)",
                  }}
                >
                  Together.
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: "700px",
                  fontWeight: 400,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  lineHeight: 1.6,
                }}
              >
                The all-in-one workspace for teams to track tasks, collaborate
                in real-time, and ship products faster.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{ mt: 2 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/signup")}
                  sx={{
                    bgcolor: "#1db5c7",
                    color: "white",
                    px: 5,
                    py: 2,
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    borderRadius: 3,
                    boxShadow: "0 20px 40px -10px rgba(29, 181, 199, 0.4)",
                    "&:hover": {
                      bgcolor: "#22d3ee",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Start Building — It's Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                    borderWidth: 2,
                    px: 5,
                    py: 2,
                    fontWeight: 700,
                    borderRadius: 3,
                    "&:hover": {
                      borderColor: "white",
                      borderWidth: 2,
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </Fade>
        </Container>
      </Box>

      {/* --- APP PREVIEW --- */}
      <Container
        maxWidth="lg"
        sx={{ mt: -16, position: "relative", zIndex: 2 }}
      >
        <Box
          sx={{
            background: "#ffffff",
            p: 1.5,
            borderRadius: 6,
            boxShadow: "0 40px 100px -20px rgba(15, 23, 42, 0.3)",
            border: "1px solid rgba(15, 23, 42, 0.1)",
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
            sx={{
              width: "100%",
              borderRadius: 5,
              display: "block",
              filter: "grayscale(10%)",
            }}
            alt="Taskly Flow Dashboard Preview"
          />
        </Box>
      </Container>

      {/* --- FEATURES --- */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Stack alignItems="center" textAlign="center" spacing={2} mb={10}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em" }}
          >
            Everything You Need to Scale
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 600, fontSize: "1.1rem" }}
          >
            No more jumping between apps. Manage your entire product lifecycle
            inside a single, unified flow.
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {[
            {
              icon: <TaskAltIcon sx={{ fontSize: 42 }} />,
              title: "Smart Task Tracking",
              color: "#1db5c7",
              desc: "Automated workflows and visual boards that adapt to your team's specific rhythm.",
            },
            {
              icon: <GroupsIcon sx={{ fontSize: 42 }} />,
              title: "Unified Teamwork",
              color: "#0f172a",
              desc: "Contextual comments, real-time collaboration, and global search across all projects.",
            },
            {
              icon: <InsightsIcon sx={{ fontSize: 42 }} />,
              title: "Powerful Insights",
              color: "#1db5c7",
              desc: "Data-driven dashboards that help you identify bottlenecks before they happen.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 6,
                  p: 3,
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.1)",
                    borderColor: "#1db5c7",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: item.color, mb: 3 }}>{item.icon}</Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, mb: 2, color: "#0f172a" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* --- CTA SECTION --- */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box
          sx={{
            p: { xs: 6, md: 10 },
            borderRadius: 10,
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 60px -15px rgba(15, 23, 42, 0.4)",
          }}
        >
          {/* Decorative Teal Glow for CTA */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              bgcolor: "rgba(29, 181, 199, 0.2)",
              filter: "blur(100px)",
              borderRadius: "50%",
            }}
          />

          <Stack
            spacing={4}
            alignItems="center"
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, letterSpacing: "-0.03em" }}
            >
              Ready to ship faster?
            </Typography>
            <Typography
              sx={{ opacity: 0.8, fontSize: "1.2rem", maxWidth: 600 }}
            >
              Join over 10,000+ creators and developers managing their ambitious
              projects on Taskly Flow.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/signup")}
              sx={{
                bgcolor: "#1db5c7",
                color: "white",
                px: 6,
                py: 2.2,
                borderRadius: 4,
                fontWeight: 800,
                fontSize: "1.1rem",
                "&:hover": { bgcolor: "#22d3ee", transform: "scale(1.05)" },
                transition: "all 0.2s",
              }}
            >
              Get Started Now
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* --- FOOTER --- */}
      <Box sx={{ py: 8, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-0.04em",
              }}
            >
              Taskly
              <Box component="span" sx={{ color: "#1db5c7" }}>
                Flow
              </Box>
            </Typography>

            <Stack direction="row" spacing={5}>
              {["Product", "Features", "Security", "Support"].map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": { color: "#1db5c7" },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", fontWeight: 500 }}
            >
              © 2026 Taskly Flow. Built for the future of work.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
