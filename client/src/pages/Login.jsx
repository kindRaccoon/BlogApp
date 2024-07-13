import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store'
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();
    const dispath = useDispatch();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/user/login",
                {
                    email: inputs.email,
                    password: inputs.password
                })
            console.log(data)
            if (data?.success) {
                localStorage.setItem("userId", data?.user._id)
                dispath(authActions.login());
                alert("User Login Successfuly");
                navigate("/")
            }
        } catch (err) {

            console.log(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450} display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    margin={'auto'}
                    marginTop={5}
                    boxShadow={"10px 10px 20px #ccc"}
                    padding={3}
                    borderRadius={5}
                >
                    <Typography variant='h4'
                        sx={{ textTransform: "uppercase" }}
                        padding={3}
                        textAlign={'center'}>
                        Login
                    </Typography>
                    <TextField placeholder='email'
                        value={inputs.email}
                        onChange={handleChange}
                        name='email'
                        margin='normal'
                        type='email' required />
                    <TextField placeholder='password'
                        value={inputs.password}
                        onChange={handleChange}
                        name='password'
                        margin='normal'
                        type='password' required />
                    <Button type='submit'
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        variant='contained'
                        color='primary'
                    >
                        Submit
                    </Button>
                    <Button onClick={() => navigate("/register")}
                        sx={{ borderRadius: 3, marginTop: 3 }}>
                        Please Register
                    </Button>
                </Box>
            </form>
        </>

    )
}

export default Login