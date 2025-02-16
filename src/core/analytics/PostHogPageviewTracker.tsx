 import { usePostHog } from "posthog-js/react";
import { useEffect } from "react"
import { useLocation } from "react-router-dom"


const PostHogPageviewTracker = () => {
    const location = useLocation();
    const posthog = usePostHog()
    useEffect(()=>{
        if(posthog){
            posthog.capture('pageview', {
                path: location.pathname,
                search: location.search, 
            })
        }
    },[posthog,location.pathname,location.search,])
    return null;
}

export default PostHogPageviewTracker