import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function useMobile() {

    const [isMobile, setIsMobile] = useState(false);
    // 'list' | 'detail'
    const params = useParams();
    const mobileView = params.id ? 'detail' : 'list'
    console.log(mobileView, params.id);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return {
        id: params.id,
        isMobile,
        setIsMobile,
        mobileView
    }
}