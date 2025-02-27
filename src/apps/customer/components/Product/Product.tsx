import { Box, IconButton, Skeleton, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductType } from "../../pages/HomeScreeen";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../../core/store/slices/cartSlice"; // assuming you have a cartSlice
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// Define the props
interface ProductProps {
  product: ProductType;
}

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  countInStock: number;
  category?: string;
}

const Product: React.FC<ProductProps> = ({ product }: any) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0); 
  const [isAddedToCart, setIsAddedToCart] = useState(false); 

  const cartItems: any = useSelector((state: any) => state.cart.cartItems);

  const handleIncrement = () => {
    if (quantity < 6) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(
        addToCart({
          ...product,
          qty: newQuantity,
          category: product.category || "defaultCategory",
        })
      );
    }
  }; 

  const handleDecrement = (id: string) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(
        addToCart({
          ...product,
          qty: newQuantity,
          category: product.category || "defaultCategory",
        })
      );
    } else {
      setIsAddedToCart(false);
      dispatch(removeFromCart(id));
    }
  };
 
  const handleAddToCart = (product: CartItem, qty: number) => {
    setIsAddedToCart(true);
    dispatch(
      addToCart({
        ...product,
        qty,
        category: product.category || "defaultCategory",
      })
    );
  };

  useEffect(() => {
    const existingItem = cartItems.find(
      (item: any) => item._id === product._id
    );
    if (existingItem) {
      setQuantity(existingItem.qty);
      setIsAddedToCart(true);
    } else {
      setQuantity(1);
      setIsAddedToCart(false);
    }
  }, [cartItems, product._id]);
  return (
    <>
    {product?(
      <Card
        sx={{
          maxWidth: 650,
        }}
        elevation={0}
      >
        {product._id?(
        <Link to={`/product/${product._id}`}>
          <Box
            sx={{
              border: "0.5px solid rgb(229 231 235)",
              borderRadius: "0.75rem",
              width: "100%",
              overflow: "hidden",
            }}
          > 
          {product.image?(
            
            <CardMedia
              component="img"
              alt={product.name}
              image={product.image}
              style={{ width: "100%", height: "auto" }}
              sx={{
                transition: "0.4s",
                transitionTimingFunction: "cubic-bezier(0.5,0,0.5,1)",
                ":hover": { scale: 1.1 },
                objectFit: "contain",
                color: "transparent",
                overflow: "hidden",
                borderRadius: "0.5rem",
              }}
            />
          ):(
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
          )}
 
          </Box>
        </Link>

        ):(
          <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        ) }
        <CardContent sx={{ padding: "0px" }}>
          <Box sx={{ marginTop: "0.5rem" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: "0.82rem",
                fontFamily: "Montserrat",
                fontWeight: 600,
                paddingX: "0.25rem",
                height: "2rem",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.81rem",
                letterSpacing: "0.025em",
                fontWeight: 400,
                lineHeight: "2rem",
                paddingX: "0.25rem",
              }}
            >
              {product.quantity}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ paddingX: "0.25rem" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "0.93rem",
              letterSpacing: "0.025em",
              lineHeight: "2.5rem",
            }}
          >
            ₹{product.price}
          </Typography>
          <Box onClick={() => {
            if(!isAddedToCart){
              handleAddToCart(product, quantity);
            }
         }}>
          <Box
            sx={{
              border: "1px solid #EF4372",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.25rem",
              height: "2.25rem",
              marginTop: "0.25rem",
            }}
            
          >
            {isAddedToCart ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "350px",
                    margin: "0 auto",
                  }}
                >
                  <Box
                    sx={{
                      paddingY: "0.16rem",
                      borderRadius: "0.15rem",
                      backgroundColor: "#FDECF1",
                    }}
                  >
                    <IconButton
                      onClick={() => handleDecrement(product._id)}
                      disabled={quantity === 0}
                    >
                      <RemoveIcon
                        sx={{
                          color: "#EF4372",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                        }}
                      />
                    </IconButton>
                  </Box>

                  {/* TextField */}
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    inputProps={{
                      readOnly: true,
                      min: 0,
                      max: 6,
                      style: {
                        color: "#EF4372",
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        textAlign: "center",
                      },
                    }}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      textAlign: "center",
                      width: "50px",
                      mx: 1,
                    }}
                  />
                  <Box
                    sx={{
                      paddingY: "0.16rem",
                      borderRadius: "0.15rem",
                      backgroundColor: "#FDECF1",
                    }}
                  >
                    <IconButton
                      onClick={handleIncrement}
                      disabled={quantity === 6}
                    >
                      <AddIcon
                        sx={{
                          color: "#EF4372",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{ cursor: "pointer" }}
                 
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.82rem",
                      textAlign: "center",
                      color: "#EF4372",
                      fontWeight: 600,
                    }}
                  >
                    Add to Cart
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          </Box>
        </Box>
      </Card>

    ):(
      <Box sx={{ pt: 1.5 }}>
      <Skeleton />
      <Skeleton   animation="wave"
              height={10}
              width="80%" />
    </Box>
    )}
    </>
  );
};

export default Product;
