import { Box, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useSelector, useDispatch } from "react-redux";
import { setMemo } from '../redux/features/memoSlice';

const Memo = () => {
    const {memoId} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const memos = useSelector((state) => state.memo.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getMemo = async () => {
            try {
                const res = await memoApi.getOne(memoId);
                console.log(res);
                setTitle(res.title);
                setDescription(res.description);
            } catch (err) {
                alert(err);
            }
        };
        getMemo();
    },[memoId]);

    let timer;
    const timeout = 500;

    const updateTitle = async (e) => {
        clearTimeout(timer);
        const newTitle = e.target.value;
        setTitle(newTitle);

        timer = setTimeout(async () => {
            try {
                await memoApi.update(memoId, {title: newTitle})
            } catch (err) {
                alert(err);
            }
        }, timeout);
    };

    const updateDescription = async (e) => {
        clearTimeout(timer);
        const newDescription = e.target.value;
        setDescription(newDescription);

        timer = setTimeout(async () => {
            try {
                await memoApi.update(memoId, {description: newDescription})
            } catch (err) {
                alert(err);
            }
        }, timeout);
    };

    const deleteMemo = async () => {
        try {
            const deletedMemo = await memoApi.delete(memoId);
            console.log(deletedMemo);
            const newMemos = memos.filter((e) => e._id !== memoId);
            if(newMemos.length === 0) {
                navigate("/memo");
            } else {
                navigate(`/memo/${newMemos[0]._id}`);
            }


            dispatch(setMemo(newMemos));
        } catch (err) {
            alert(err);
        }
    }
    
    return (
        <div>
            <>
                <Box 
                    sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        width: "100%",
                    }}>
                        <IconButton>
                            <StarBorderOutlinedIcon />
                        </IconButton>
                        <IconButton 
                            variant="outlined"
                            color="error"
                            onClick={deleteMemo}
                        >
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Box 
                        sx={{
                            padding: "10px 50px"
                        }}>
                            <TextField 
                                onChange={updateTitle}
                                value={title}
                                placeholder="無題"
                                variant="outlined"
                                fullWidth 
                                sx={{
                                    ".MuiOutlinedInput-input": { padding:0 },
                                    ".MuiOutlinedInput-notchedOutline": { border: "none" },
                                    ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
                                }}
                            />
                            <TextField 
                                onChange={updateDescription}
                                value={description}
                                placeholder="追加"
                                variant="outlined"
                                fullWidth 
                                sx={{
                                    ".MuiOutlinedInput-input": { padding:0 },
                                    ".MuiOutlinedInput-notchedOutline": { border: "none" },
                                    ".MuiOutlinedInput-root": { fontSize: "1rem" },
                                }}
                            />
                    </Box>
            </>
        </div>
    )
}

export default Memo;
