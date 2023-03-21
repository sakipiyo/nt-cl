import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import ntLogo from "../../assets/images/nt-logo.png";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";

const AppLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        //JWTを持っているか確認する。
        const checkAuth = async () => {
            //認証チェック
            const user = await authUtils.isAuthenticated();
            if(!user) {
                navigate("/");
            }
        };
        checkAuth();
    }, [navigate]);
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Box sx={{ flexGlow: 1, p:1 , width: "max-content" }}>
                    <Outlet />
                </Box>
            </Box>
        </div>
    );
};

export default AppLayout;