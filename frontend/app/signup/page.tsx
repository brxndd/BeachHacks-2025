// app/signup/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // First, create the user through your FastAPI endpoint
      const signupResponse = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        throw new Error(errorData.detail || 'Signup failed');
      }

      // If signup successful, automatically log the user in
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect to home page on success
      window.location.href = '/';
    } catch (error: any) {
      alert(error.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#8a2929]">Create Account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a2929] focus:ring-[#8a2929]"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a2929] focus:ring-[#8a2929]"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a2929] focus:ring-[#8a2929]"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message?.toString()}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#8a2929] text-white py-2 px-4 rounded-md hover:bg-[#B30707] transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link 
            href="/signin" 
            className="text-[#8a2929] hover:text-[#B30707] font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}