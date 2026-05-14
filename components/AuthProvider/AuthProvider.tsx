'use client'

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated)
    
    // 1. Initialize loading as true because we start fetching immediately
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const isAuthenticated = await checkSession();
                
                if (isAuthenticated) {
                    const user = await getMe();
                    if (user) setUser(user);
                } else {
                    clearIsAuthenticated();
                }
            } catch (error) {
                // console.error("Auth initialization failed:", error);
                clearIsAuthenticated();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [setUser, clearIsAuthenticated]);

    if (isLoading) {
        return <p>Loader...</p>;
    }

    return <>{children}</>;
}

export default AuthProvider;