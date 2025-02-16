import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useGetProductDetailsQuery } from "../../../core/store/slices/productsApiSlice";
import { addToCart, clearCartItems, removeFromCart } from "../../../core/store/slices/cartSlice";
import Loader from "../../../shared/components/Loader/Loader";
import Message from "../../../shared/components/Message/Message";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export interface ProductType {
  _id: string; // Changed to string, assuming MongoDB's default ObjectId format
  name: string;
  image: string;
  price: number;
  category: string;
  qty:number;
  countInStock: number;
}
const ProductScreen: React.FC<ProductType> = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const cartItems = useSelector((state:any) => state.cart.cartItems);

  const handleAddToCart = (product: any, qty: number) => {
    setIsAddedToCart(true);
    dispatch(
      addToCart({
        ...product,
        qty,
        category: product.category || "defaultCategory",
      })
    );
  };

  const handleIncrement = () => {
    if (qty < 6) {
      const newQuantity = qty + 1;
      setQty(newQuantity);
           
      dispatch(
        addToCart({
          ...product,
          qty: newQuantity,
        }),
       clearCartItems()

      );
    }
  };


  const handleDecrement = (id: string) => {
    if (qty > 1) {
      const newQuantity = qty - 1;
      setQty(newQuantity);
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


  const isFetchBaseQueryError = (
    error: any
  ): error is { data: { message: string } } => {
    return error?.data && typeof error.data.message === "string";
  };


  const renderError = () => {
    if (isFetchBaseQueryError(error)) {
      return <Message variant="danger">{error.data.message}</Message>;
    } else if (error instanceof Error) {
      return <Message variant="danger">{error.message}</Message>;
    }
    return <Message variant="danger">Something went wrong</Message>;
  };


  useEffect(() => {
    if (product && product._id) {
      const existingItem = cartItems.find((item:any) => item._id === product._id);
      if (existingItem) {
        setQty(existingItem.qty);
        setIsAddedToCart(true);
      }else{
        setQty(1);
        setIsAddedToCart(false);
        
      }
    }
  }, [cartItems, product]);
  return (
    <Box sx={{ mx: "auto", padding: "2rem", width: { lg: "1040px" } }}>
      <Link className="btn btn-light my-4" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        renderError()
      ) : (
        <Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  border: "1px solid rgb(223, 228, 236)",
                  borderRadius: "1.5rem",
                }}
              >
                <img
                  src={product?.image}
                  alt={product?.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "1.5rem",

                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                  lineHeight: "1.25rem",
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
                    backgroundColor:"#EF4372",
                    borderRadius:'0.625rem',
                    boxShadow:'0px',
                    padding:'0.75rem 1rem 0.75rem 1rem',
                    height:"3rem"
                  }}
                >
                  <Box>
                    <IconButton
                      onClick={() => handleDecrement(product._id)}
                      disabled={qty === 0}
                    >
                      <RemoveIcon
                        sx={{
                          fontWeight: 700,
                          color: "#FFFFFF",
                        }}
                      />
                    </IconButton>
                  </Box>

                  {/* TextField */}
                  <TextField
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    inputProps={{
                      readOnly: true,
                      min: 0,
                      max: 6,
                      style: {
                        color: "#FFFFFF",
                        fontWeight: 500,
                        textAlign: "center",
                      },
                    }}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      textAlign: "center",
                      mx: 1,
                    }}
                  />
                  <Box>
                  <IconButton
                    onClick={handleIncrement}
                    disabled={qty === 6}
                    sx={{ width:'2rem',}}
                  >
                    <AddIcon
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 700,
                      }}
                    />
                  </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Button
                fullWidth
                  sx={{ cursor: "pointer",backgroundColor:"#EF4372", padding:'0.75rem 1rem 0.75rem 1rem', borderRadius:'0.625rem',}}
                  disableElevation
                  disableTouchRipple
                  onClick={() => {
                    handleAddToCart(product, qty);
                  }}
                  variant="contained"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      color: "#FFFFFF",
                      fontWeight: 600,

                      fontSize:'1rem'
                    }}
                  >
                    Add to Cart
                  </Typography>
                </Button>
              </>
            )}

              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Card
                  sx={{
                    padding: "1.5rem",
                    border: "1px solid rgb(223, 228, 236)",
                    borderRadius: "1rem",
                  }}
                  elevation={0}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "rgb(38, 42, 51)",
                        fontFamily: "Lato",
                      }}
                    >
                      {product?.name}
                    </Typography>
                    <IconButton>
                      <img
                        src="https://cdn.zeptonow.com/production/inventory/banner/c9ea0974-855e-4681-b0e1-437a76ebe511.svg"
                        alt="Share"
                        width="20"
                        height="20"
                      />
                    </IconButton>
                  </Box>
                  <Typography
                    sx={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#757C8D",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Net Qty:{" "}
                    <span style={{ color: "#757C8D", fontWeight: "600" }}>
                      {product?.quantity}
                    </span>
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      marginTop: "1.25rem",
                    }}
                  >
                    <svg
                      fill="none"
                      height="24px"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.095 2.4H6L2.4 16.09h7.36L8.276 28.8 16.8 10.711h-6.3l2.595-8.31Z"
                        fill="url(#a)"
                      ></path>
                      <defs>
                        <linearGradient
                          gradientUnits="userSpaceOnUse"
                          id="a"
                          x1="10.5"
                          x2="10.5"
                          y1="2.4"
                          y2="28.8"
                        >
                          <stop stopColor="#28D291"></stop>
                          <stop offset="1" stopColor="#046D45"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <Box
                      sx={{
                        backgroundImage:
                          "linear-gradient(90deg, #FFF 0%, #EBFAF4 14.43%)",
                        backgroundSize: "cover",
                        paddingRight: "0.56rem",
                        paddingTop: "0.375rem",
                        paddingBottom: "0.375rem",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgb(4 109 69)",
                          fontSize: "0.75rem",
                          lineHeight: "14px",
                          fontWeight: "450",
                          fontFamily: "Inter",
                        }}
                      >
                        Get in{" "}
                        <span style={{ fontWeight: "600", lineHeight: "14px" }}>
                          30-35 minutes
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: "1.25rem" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.8125rem",
                        color: "#757C8D",
                        lineHeight: "1rem",
                      }}
                    >
                      <span
                        style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                      >
                        MRP
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "#000000",
                          fontSize: "1rem",
                        }}
                      >
                        ₹{product.price}
                      </span>
                      <span
                        style={{
                          marginLeft: "0.5rem",
                          marginTop: "0.5rem",
                          lineHeight: "1rem",
                        }}
                      >
                        (incl. all taxes)
                      </span>
                    </Typography>
                  </Box>
                </Card>

                {/* HighLights Card */}

                <Card
                  sx={{
                    padding: "1.5rem",
                    border: "1px solid rgb(223, 228, 236)",
                    borderRadius: "1rem",
                    marginTop: "1.5rem",
                  }}
                  elevation={0}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "rgb(38, 42, 51)",
                        fontFamily: "Lato",
                        lineHeight: "1.25rem",
                      }}
                    >
                      Highlights
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "1.25rem", gap: "2rem" }}>
                    <Typography
                      sx={{
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#757C8D",
                        fontFamily: "Inter",
                        gap: "0.75rem",
                      }}
                    >
                      Category{" "}
                      <span
                        style={{
                          marginLeft: "7rem",
                          color: "#000",
                          fontFamily: "Lato",
                        }}
                      >
                        {product?.category}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "1.25rem", gap: "2rem" }}>
                    <Typography
                      sx={{
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#757C8D",
                        fontFamily: "Inter",
                        gap: "0.75rem",
                      }}
                    >
                      Product Type{" "}
                      <span
                        style={{
                          marginLeft: "5.3rem",
                          color: "#000",
                          fontFamily: "Lato",
                        }}
                      >
                        {product?.name}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "1.25rem", gap: "2rem" }}>
                    <Typography
                      sx={{
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#757C8D",
                        fontFamily: "Inter",
                        gap: "0.75rem",
                      }}
                    >
                      Weight{" "}
                      <span
                        style={{
                          marginLeft: "8rem",
                          color: "#000",
                          fontFamily: "Lato",
                        }}
                      >
                        {product?.quantity}
                      </span>
                    </Typography>
                  </Box>
                </Card>

                {/* Information */}
                <Card
                  sx={{
                    padding: "1.5rem",
                    border: "1px solid rgb(223, 228, 236)",
                    borderRadius: "1rem",
                    marginTop: "1.5rem",
                  }}
                  elevation={0}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "rgb(38, 42, 51)",
                        fontFamily: "Lato",
                        lineHeight: "1.25rem",
                      }}
                    >
                      Information
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "1.25rem", gap: "2rem" }}>
                    <Typography
                      sx={{
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#757C8D",
                        fontFamily: "Inter",
                        gap: "0.75rem",
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        lineHeight: "1.25rem",
                      }}
                    >
                      Disclaimer{" "}
                      <Box
                        component="span"
                        sx={{
                          marginLeft: { xs: "2rem", lg: "6rem" },
                          color: "#000",
                          fontFamily: "Lato",
                        }}
                      >
                        Efforts are made to ensure accuracy, but product
                        packaging may have additional or updated details. Please
                        do no rely solely on the information provided and refer
                        to the packaging for complete details.
                      </Box>
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ProductScreen;
