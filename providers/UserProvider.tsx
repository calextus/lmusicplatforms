"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UseProviderProps {
    children: React.ReactNode;
};

const UserProvider: React.FC<UseProviderProps> = ({
    children
}) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
};

export default UserProvider;