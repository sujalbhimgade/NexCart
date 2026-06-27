import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#818cf8",
        },
        secondary: {
            main: "#f59e0b",
        },
        background: {
            default: "#0f172a",
            paper: "#1e293b",
        },
    },
    typography: {
        fontFamily: "Inter, Roboto, sans-serif",
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 10,
    },
});

export default theme;