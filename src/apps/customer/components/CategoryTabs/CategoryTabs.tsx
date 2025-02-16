import { Tabs, Tab, Box } from '@mui/material';
const CategoryTabs = ({selectedCategory,onCategoryChange}:{selectedCategory:string,onCategoryChange:(event:any,newValue:string)=>void}) => {
    return (
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',}}>
          <Tabs
            value={selectedCategory}
            onChange={onCategoryChange}
            variant="scrollable"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#AA4AE3",  
                height: "1px",  
              },
              
            }}
            sx={{ mb: 3,}}
            
          > 
            <Tab
              label={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color:
                      selectedCategory === "All Items" ? "#AA4AE3" : "#9291A4",
                      fontSize:{xs:'0.7rem',md:"0.9rem"}
                  }}  
                >
                  <Box
                    component="img"
                    src="images/icons/allitems.png"
                    alt="All Items"
                    sx={{ width: { md: 180,xs:80 }, height: { md: 100,xs:40}, mb: 1 }}
                  />
                  All Items
                </Box>
              }
              value="All Items"
            />
             
            <Tab
              label={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color:
                      selectedCategory === "Vegetables" ? "#AA4AE3" : "#9291A4",
                      fontSize:{xs:'0.7rem',md:"0.9rem"}
                  }}
                >
                  <Box
                    component="img"
                    src="images/icons/vegetables.png"
                    alt="Vegetables"
                    sx={{ width: { md: 180,xs:60 }, height: { md: 100,xs:40 }, mb: 1 }}
                  />
                  Fresh Vegetables
                </Box>
              }
              value="Vegetables"
            />
            <Tab
              label={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color:
                      selectedCategory === "Fruits" ? "#AA4AE3" : "#9291A4",
                      fontSize:{xs:'0.7rem',md:"0.9rem"}
                  }}
                >
                  <Box
                    component="img"
                    src="images/icons/fruits.jpg"
                    alt="Fruits"
                    sx={{ width: { md: 100,xs:50 }, height: { md: 100,xs:40 }, mb: 1 }}
                  />
                  Fresh Fruits
                </Box>
              }
              value="Fruits"
            />
          </Tabs> 
        </Box> 
    )
}
export default CategoryTabs;