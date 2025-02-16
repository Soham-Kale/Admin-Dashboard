import { useGetProductsQuery, useCreateProductMutation,} from "../../../core/store/slices/productsApiSlice";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
//import { Search, CalendarToday, Tune } from "@mui/icons-material";
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    InputAdornment,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const Searchbar = () => {
    const { refetch } = useGetProductsQuery({});
    const [createProduct,] = useCreateProductMutation();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query.toLowerCase());
    };

    // const filteredProducts = products?.filter((product: any) => {
    //     const matchesSearch =
    //         product.name?.toLowerCase().includes(searchQuery) ||
    //         "" ||
    //         product.sku?.toLowerCase().includes(searchQuery) ||
    //         "" ||
    //         product.category?.toLowerCase().includes(searchQuery) ||
    //         "";

    //     let matchesTab = true;
    //     switch (tabValue) {
    //         case 1:
    //             matchesTab = product.status === "Published";
    //             break;
    //         case 2:
    //             matchesTab = product.status === "Low Stock";
    //             break;
    //         case 3:
    //             matchesTab = product.status === "Draft";
    //             break;
    //     }

    //     return matchesSearch && matchesTab;
    // });

    const createProductHandler = async () => {
        if (window.confirm("Are you sure, you want to create a new product?")) {
            try {
                await createProduct({});
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    // const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    //     setTabValue(newValue);
    // };

    return (
        <>
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
                        onClick={createProductHandler}
                        sx={{
                            backgroundColor: "#591849",
                            "&:hover": {
                                backgroundColor: "#4A1038",
                            },
                            textTransform: "none",
                            borderRadius: "8px",
                            height: "40px",
                            //width: { xs: '100%', sm: '300', lg: '150px' },
                            minWidth: { xs: "100%", sm: "50%", lg: "150px" },
                        }}
                    >
                        Add Product
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Searchbar;
