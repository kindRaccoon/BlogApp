import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: '',
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
            const res = await axios.post("/api/user/register",
                {
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password
                })
            if (res.success) {
                alert("User Register Successfuly");
                navigate("/login")
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
                        Register
                    </Typography>
                    <TextField placeholder='username'
                        value={inputs.username}
                        onChange={handleChange}
                        name='username'
                        margin='normal'
                        type='text' required />
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
                    <Button onClick={() => navigate("/login")}
                        sx={{ borderRadius: 3, marginTop: 3 }}>
                        Please Log In
                    </Button>
                </Box>
            </form>
        </>

    )
}

export default Register