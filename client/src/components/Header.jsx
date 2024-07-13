import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const [value, setValue] = useState(0);

    //Global State
    const isLogin = useSelector(state => state.isLogin);
    const dispath = useDispatch();
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        try {
            dispath(authActions.logout());
            alert("Logout Successfuly");
            navigate("/login");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>
                        <Link to="/">
                            Blog App
                        </Link>
                    </Typography>
                    {isLogin && (
                        <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
                            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                                <Tab label='Blogs' LinkComponent={Link} to="/blogs" />
                                <Tab label='MyBlogs' LinkComponent={Link} to="/userblogs" />
                                <Tab label='CreateBlog' LinkComponent={Link} to="/create" />
                            </Tabs>
                        </Box>
                    )}
                    <Box display={'flex'} marginLeft="auto">
                        {!isLogin && (
                            <>
                                <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login">Login</Button>
                                <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/register">Register</Button>
                            </>
                        )}
                        {isLogin && (
                            <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>Logout</Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header