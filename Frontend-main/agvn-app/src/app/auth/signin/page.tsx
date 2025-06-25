'use client'

import React from 'react';
import { Button, Text, Box, Flex, Input, FormControl, FormLabel } from '@chakra-ui/react';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Popups from '../../../components/Popup';
import PageTitle from '../../../components/PageTitle';
import { Banner } from '../../../components/TheHeader';
import Layout from '../../../components/TheLayout';

const host = 'http://127.0.0.1:8000/api/v1';

export default function SigninPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const cookies = new Cookies();
    const router = useRouter();

    async function login(e: any) {
        e.preventDefault();
        try {
            const req = {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "email": email,
                        "password": password,
                    }
                )
            };
            const response = await fetch(`${host}/login`, req);
            if (response.status === 400) {
                setEmail('');
                setPassword('');
                setErrorMsg('Wrong password or email');
            } else {
                const data = await response.json();
                setErrorMsg('')
                cookies.set('token', data.token, { path: '/' });
                router.push('/');
            }
        } catch (error) {
            setErrorMsg("Please try again.");
            setPassword('');
        }
    }

    React.useEffect(() => {
        if (cookies.get('token') !== undefined) {
            router.push('/');
        }
    })

    function recordEmail(e: any) {
        e.preventDefault();
        setEmail(e.target.value);
        setErrorMsg('');
    }

    function recordPassword(e: any) {
        e.preventDefault();
        setPassword(e.target.value);
        setErrorMsg('');
    }

    return (
        <Layout>
            <Banner title="Login" subtitle="Login to A-GVN System" />
            <Flex flexDir="column" m="5rem" alignItems="center" justifyContent="center" >
                <Flex my={75} h='2rem'>
                    <PageTitle title="Sign in" />
                </Flex>
                <Box
                    as="form"
                    onSubmit={login}
                    h="100%"
                    pl="2.5rem"
                    maxW="500px"
                    w="100%"
                >
                    <FormControl mb={4} isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={recordEmail}
                            placeholder="Enter your email"
                        />
                    </FormControl>

                    <FormControl mb={6} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={recordPassword}
                            placeholder="Enter your password"
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                        width="100%"
                        mb="2rem"
                    >
                        Sign in
                    </Button>

                    <Text textAlign="center">
                        Don't have an account?{' '}
                        <Text as="span" fontWeight="bold" color="blue.500">
                            <Link href="/auth/signup">Create one.</Link>
                        </Text>
                    </Text>
                </Box>
                <Popups type="error" message={errorMsg} />
            </Flex>
        </Layout>
    )
}
