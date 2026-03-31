import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";

import useApiClient from "../hooks/useApiClient";

function Carousel() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const apiClient = useApiClient();

  // Auto slide
  useEffect(() => {
    if (!data.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  // Fetch images
  useEffect(() => {
    apiClient("https://picsum.photos/v2/list?page=1&limit=5")
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [apiClient]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <Box sx={{ width: "100%", position: "relative", mt: 3 }}>
      {/* Loading */}
      {loading && <CircularProgress />}

      {/* Error */}
      {error && <Alert severity="error">Something went wrong</Alert>}

      {/* Banner */}
      {!loading && !error && (
        <>
          <Box
            sx={{
              width: "100%",
              height: 300,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              boxShadow: 4,
            }}
          >
            {/* Image */}
            <img
              src={data[index].download_url}
              alt="banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.5s ease-in-out",
              }}
            />

            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                p: 2,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              }}
            >
              <Typography variant="h6" color="white">
                {data[index].author}
              </Typography>
            </Box>

            {/* Left Arrow */}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.7)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              Previous
            </IconButton>

            {/* Right Arrow */}
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.7)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              Next
            </IconButton>
          </Box>

          {/* Dots Indicator */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              gap: 1,
            }}
          >
            {data.map((_, i) => (
              <Box
                key={i}
                onClick={() => setIndex(i)}
                sx={{
                  width: index === i ? 20 : 10,
                  height: 10,
                  borderRadius: 5,
                  bgcolor: index === i ? "primary.main" : "grey.400",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Carousel;
