import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
  InputAdornment,
  Pagination,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Sidebar from "../components/Sidebar/Sidebar";
import { Tune } from "@mui/icons-material";
import CustomerGrid from "./CustomerGrid";
import CreateCustomerModal from "../pages/CreateCustomerModel";

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [tabValue, setTabValue] = useState<number>(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
      <Box
        sx={{
          width: { xs: "100%", lg: "240px" },
          position: { xs: "static", lg: "fixed" },
          height: { xs: "auto", lg: "100vh" },
          zIndex: 1000,
        }}
      >
        <Sidebar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", lg: "calc(100% - 240px)" },
          marginLeft: { xs: 0, lg: 32 },
          marginTop: { xs: 6, lg: 3 },
          p: { xs: 1, sm: 2, md: 3 },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: { xs: 2, md: 3 },
            p: { xs: 1, sm: 2 },
          }}
        >
          {/* Search Bar */}
          <TextField
            placeholder="Search order..."
            size="small"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            sx={{
              backgroundColor: "white",
              width: { xs: "100%", md: "100%" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 5, sm: 2 },
              flexDirection: { xs: "row", sm: "row" },
              width: { xs: "40%", md: "40%" },
              marginLeft: { xs: 0, sm: 2, md: 7 },
            }}
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<FileDownloadOutlinedIcon />}
              sx={{
                backgroundColor: "rgba(58, 91, 255, 0.15)",
                color: "#4A4A8A",
                textTransform: "none",
                borderRadius: "8px",
                height: "40px",
                minWidth: { xs: "100%", sm: "120px" },
              }}
            >
              Export
            </Button>

            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsCreateModalOpen(true)}
              sx={{
                backgroundColor: "#591849",
                "&:hover": {
                  backgroundColor: "#4A1038",
                },
                textTransform: "none",
                borderRadius: "8px",
                height: "40px",
                minWidth: { xs: "120%", sm: "50%", lg: "150px" },
              }}
            >
              Add Customer
            </Button>

            <CreateCustomerModal
              open={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
            />
          </Box>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 3, ml: 3 }}>
          {/* Tabs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  minWidth: "auto",
                  px: 2,
                  color: "text.secondary",
                  "&.Mui-selected": {
                    color: "#6366F1",
                  },
                },
                "& .MuiTabs-indicator": {
                  bgcolor: "#6366F1",
                },
                border: '0.7px solid #E0E2E7',
                borderRadius: 3,
              }}
            >
              <Tab label="All" />
              <Tab label="Active" />
              <Tab label="Blocked" />
            </Tabs>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                startIcon={<Tune />}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                }}
              >
                Filters
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Customer Grid */}
      <CustomerGrid />

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
        }}
      >
        <Pagination
          count={10}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          shape="rounded"
        />
      </Box>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Block</MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomerManagement;
