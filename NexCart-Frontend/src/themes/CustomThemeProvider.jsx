import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "./base";

export const CustomThemeContext = React.createContext({
    currentTheme: "normal",
    setTheme: null,
});

const CustomThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem("appTheme") || "normal";
    const [themeName, setThemeNameState] = useState(savedTheme);

    const theme = getTheme(themeName);

    const setTheme = (name) => {
        localStorage.setItem("appTheme", name);
        setThemeNameState(name);
    };

    return (
        <CustomThemeContext.Provider value={{ currentTheme: themeName, setTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export default CustomThemeProvider;

