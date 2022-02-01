import React from 'react';
import { CircularProgress, Box } from "@material-ui/core";


const LoadingBar = ({ children, open }) => {
    return (
        <>
        {open ? (
            <Box
                style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <CircularProgress color="secondary" />
            </Box>
        ):(
            <>
            {children}
            </>
        )}
      </>
    );
};

export default LoadingBar;