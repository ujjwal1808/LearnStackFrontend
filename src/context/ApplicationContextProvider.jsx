import { useState } from "react";
import applicationContext from "./Context";

const ApplicationContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <applicationContext.Provider value={{ user, setUser }}>
            {children}
        </applicationContext.Provider>
    );
};

export default ApplicationContextProvider;
