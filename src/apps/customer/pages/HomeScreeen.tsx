import { useMemo, useState } from "react";
import Product from "../components/Product/Product";
import Loader from "../../../shared/components/Loader/Loader";
import Message from "../../../shared/components/Message/Message";
import { useGetProductsQuery } from "../../../core/store/slices/productsApiSlice";
import { Box,  Skeleton,  Typography  } from "@mui/material";
import Grid from '@mui/material/Grid2' 
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import { useSearchParams } from "react-router-dom"; 
export interface ProductType {
  _id: string;  
  name: string;
  image: string;
  price: number;
  category: string;
  qty:number
}

const HomeScreen = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All Items");  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';  

  
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All Items") {
      filtered = filtered.filter((product) =>
        product.category === selectedCategory
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]);
  const isFetchBaseQueryError = (
    error: any
  ): error is { data: { message: string }; error: string } => {
    return error && error.data && error.error;
  };

  const handleTabChange = (_event:any,newValue: string) => {
    setSelectedCategory(newValue);
  };

  return (
    <Box sx={{ my: { sm: 10, md: 10 }, }}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        isFetchBaseQueryError(error) ? (
          <Message variant="danger">
            {error.data.message || error.error}
          </Message>
        ) : (
          <>
          <Message variant="danger">Something went wrong! Please try again later. Contact support if the issue persists.</Message>
          <Loader/>
          </>
        )
      ) : (
        <>
        <CategoryTabs onCategoryChange={handleTabChange} selectedCategory={selectedCategory}/>
        <Box>
           {/* Search results message */}
        {searchQuery && (
          <Typography sx={{ my: 2 }}>
            {filteredProducts.length === 0 
              ? `No results found for "${searchQuery}"`
              : `Showing results for "${searchQuery}"`
            }
          </Typography>
        )}
          {!isLoading?(
         <Grid container spacing={{ xs:2, md:1,sm:4,lg:2 }}> 
            {filteredProducts.map((product: ProductType) => (
              <Grid size={{xs:6,md:3,sm:4,lg:2}} key={product._id}>
                <Product product={product}/>
              </Grid>
            ))}
        </Grid>
          ):(
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
          )}
         </Box>
        </>
      )}
    </Box>
  );
};

export default HomeScreen;
