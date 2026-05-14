'use client'

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearuthenticated = useAuthStore((state) => state.clearIsAuthenticated)

    useEffect(() => {
        const Fetch = async () => {
            const isAuthenticated = await checkSession();

            if(isAuthenticated){
                const user = await getMe();
                if(user) setUser(user);
            } else {
                clearuthenticated();
            }
        }
        Fetch();
    }, [setUser, clearuthenticated])

    if(!setUser) return <p>Loader...</p>

    return children;
}

export default AuthProvider;