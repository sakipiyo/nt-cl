import React from 'react';
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const createMemo = () => {
    try{
      setLoading(true);
    } catch(err) {
      alert(err);
    }
  };

  return (
    <Box 
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton 
        variant="outlined"
        onClick={() => createMemo}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;