import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#6366f1",
        },
        secondary: {
            main: "#f59e0b",
        },
        background: {
            default: "#f8fafc",
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
