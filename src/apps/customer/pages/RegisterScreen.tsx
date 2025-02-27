import { useEffect, useState } from "react"
import { Link,useLocation,useNavigate } from "react-router-dom"
import { Col, Row,Button,Form } from "react-bootstrap"
import FormContainer from "../components/FormContainer/FormContainer"
import { useSelector } from "react-redux"
// import Loader from "../components/Loader/Loader"
// import { useRegisterMutation } from "../slices/usersApiSlice"
// import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
    // Add other properties as needed
  }
  
  interface CartItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    qty: number;
    countInStock: number;
    category?: string; // Make category optional
  }
  
  interface RootState {
    cart: {
      cartItems: CartItem[];
      shippingAddress: any;
      paymentMethod: string;
    };
    auth: {
      userInfo: User | null;
    };
  }
  interface ErrorResponse {
    data?: {
      message: string;
    };
    error: string;
  }
const RegisterScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    // const dispatch= useDispatch();
    const navigate =useNavigate();

    // const [register,{isLoading}] =useRegisterMutation();
    const {userInfo} = useSelector((state: RootState)=> state.auth);
    const {search} =useLocation();
    const sp = new URLSearchParams(search);
    const redirect  = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,redirect,navigate])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Passwords don't match")
        }else{

            try{
                // const res =await register({name,email,password}).unwrap();
                // dispatch(setCredentials({...res,}));
                navigate(redirect)
            }catch(err:unknown){
                const error = err as ErrorResponse;
                toast.error(error.data?.message || error.error)
            }
        }
    }
    return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId=" confirmpassword" className="my-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2" >Register</Button>
            {/* {isLoading && <Loader/>} */}
        </Form>
        <Row className="py-3">
            <Col>
                Already have an account ? <Link to={redirect ? `/login?redirect=${redirect}` :'/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen;