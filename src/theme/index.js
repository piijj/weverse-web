import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            "Apple SD Gothic Neo",
            "Malgun Gothic",
            "Segoe UI",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
        ].join(","),
    },
    palette: {
        primary: {
            main: "#0BE6C1",
        },
        secondary: {
            main: "rgba(255, 255, 255)",
        },
        text: {
            primary: "#000",
            secondary: "#878E96",
            tertiary: "#BDC0C5",
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                color: "rgb(32, 36, 41)",
                width: "100%",
                height: "47px",
                backgroundColor: "rgb(255, 255, 255)",
                fontSize: "16px",
                borderRadius: "4px",
                wordBreak: "break-all",
                "&:hover $notchedOutline": {
                    borderColor: "rgb(235, 235, 235)",
                },
                "&$focused $notchedOutline": {
                    borderColor: "rgb(11, 230, 193)",
                },
            },
            input: {
                boxSizing: "border-box",
                height: "100%",
            },
            notchedOutline: {
                borderColor: "rgb(235, 235, 235)",
            },
        },
        MuiButton: {
            root: {
                background: "rgb(11, 230, 193)",
                outline: "none",
                borderRadius: "4px",
                border: "1px solid rgb(11, 230, 193)",
                color: "rgb(255, 255, 255)",
                cursor: "pointer",
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "700",
                width: "100%",
                height: "52px",
                padding: "0px 12px",
                textAlign: "center",
                lineHeight: "0px",
                transition: "all 0.5s ease-out 0s",
                "&$disabled": {
                    background: "rgb(228, 230, 234) !important",
                    border: "1px solid rgb(228, 230, 234)",
                },
                "&:hover": {
                    background: "rgb(228, 230, 234) !important",
                    border: "1px solid rgb(228, 230, 234)",
                },
            },
        },
        MuiAppBar: {
            root: {
                width: "100%",
                height: "75px",
                display: "flex",
                zIndex: "1100",
                boxSizing: "border-box",
                flexShrink: 0,
                flexDirection: "column",
                borderBottom: "1px solid rgb(235, 235, 235)",
                backgroundColor: "rgb(255, 255, 255)",
                boxShadow: "none",
            },
        },
    },
});

export default theme;
