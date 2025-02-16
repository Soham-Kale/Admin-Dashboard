import { Container } from "react-bootstrap";
import Header from "./apps/customer/components/Header/Header.tsx";
import Footer from "./apps/customer/components/Footer/Footer.tsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./core/store/slices/authSlice.ts";
import { initializeSessionId } from "./shared/utils/sessionUtils.ts";
//import OfflineMessage from "./apps/customer/components/OfflinePage/OfflineMessage.tsx";
//import useNetworkStatus from "./shared/hooks/useNetworkStatus.ts";

//import PostHogPageviewTracker from './core/analytics/PostHogPageviewTracker.tsx'


const App = () => {
  const dispatch = useDispatch();
  //const isOnline = useNetworkStatus();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch(setAuth(JSON.parse(storedUser)));
    }
  }, [dispatch]);

useEffect(()=>{
  initializeSessionId();
},[])

  return (
    <>
      <Header />
      <main style={{paddingTop:"0rem"}}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
