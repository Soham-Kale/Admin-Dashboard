import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TuneIcon from "@mui/icons-material/Tune";

const ProductToolbar: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const handleFilterChange = (_event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        padding: "8px",
        // Ensure proper wrapping for smaller screens
      }}
    >
      
      {/* Left Side - Filters */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 1, // Adjust spacing between buttons
          "& .MuiToggleButton-root": {
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 500,
            padding: "6px 12px",
            border: "none",
            color: "#666",
            backgroundColor: "transparent",
            "&.Mui-selected": {
              backgroundColor: "#F1F1FF",
              color: "#4A4A8A",
            },
            "&:hover": {
              backgroundColor: "#E0E0FF",
            },
          },
        }}
      >
        <ToggleButton value="all">All Product</ToggleButton>
        <ToggleButton value="published">Published</ToggleButton>
        <ToggleButton value="low-stock">Low Stock</ToggleButton>
        <ToggleButton value="draft">Draft</ToggleButton>
      </ToggleButtonGroup>

      {/* Right Side - Search & Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%", // Full width on smaller screens
          justifyContent: { xs: "center", sm: "flex-end" }, // Center on small screens, align right on larger screens
        }}
      >
        {/* Search Input */}
        <TextField
          variant="outlined"
          placeholder="Search product..."
          size="small"
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: "250px" }, // Adjust width based on screen size
            maxWidth: "400px", // Prevent excessive width on larger screens
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Date Picker Button */}
        <Button
          variant="outlined"
          startIcon={<CalendarTodayIcon />}
          sx={{
            textTransform: "none",
            color: "#666",
            borderColor: "#ddd",
            "&:hover": { borderColor: "#bbb" },
            minWidth: "150px", // Ensure buttons have consistent size
            width: { xs: "100%", sm: "auto" }, // Full width on small screens
          }}
        >
          Select Date
        </Button>

        {/* Filter Button */}
        <Button
          variant="outlined"
          startIcon={<TuneIcon />}
          sx={{
            textTransform: "none",
            color: "#666",
            borderColor: "#ddd",
            "&:hover": { borderColor: "#bbb" },
            minWidth: "150px", // Ensure buttons have consistent size
            width: { xs: "100%", sm: "auto" }, // Full width on small screens
          }}
        >
          Filters
        </Button>
      </Box>
    </Box>
  );
};

export default ProductToolbar;
