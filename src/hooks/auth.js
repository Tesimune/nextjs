import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  };

  const register = async ({
    first_name,
    last_name,
    email,
    phone_code,
    phone_number,
    password,
    password_confirmation,
    setErrors,
    setStatus,
  }) => {
    try {
      const response = await axios.post('/register', {
        first_name,
        last_name,
        email,
        phone_code,
        phone_number,
        password,
        password_confirmation,
      });
      localStorage.setItem('token', response.data.token);
      setStatus('Registration successful!');
      console.log(response)
      // router.push('/dashboard');
      fetchUser();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setStatus('An error occurred. Please try again.');
      }
    }
  };

  const login = async ({ email, password, setErrors, setStatus }) => {
    try {
      const response = await axios.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setStatus('Login successful!');
      router.push('/dashboard');
      fetchUser();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setStatus('An error occurred. Please try again.');
      }
    }
  };

  const forgotPassword = async ({ email, setErrors, setStatus }) => {
    try {
      const response = await axios.post('/forgot-password', { email });
      setStatus(response.data.status);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setStatus('An error occurred. Please try again.');
      }
    }
  };

  const resetPassword = async ({
    email,
    password,
    password_confirmation,
    token,
    setErrors,
    setStatus,
  }) => {
    try {
      const response = await axios.post('/reset-password', {
        email,
        password,
        password_confirmation,
        token,
      });
      setStatus(response.data.status);
      router.push('/login');
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setStatus('An error occurred. Please try again.');
      }
    }
  };

  const resendEmailVerification = async ({ setStatus }) => {
    try {
      const response = await axios.post('/email/verification-notification');
      setStatus(response.data.status);
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      localStorage.removeItem('token');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
