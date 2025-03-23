// app/signin/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    const result = await signIn('credentials', {
      redirect: false,
      ...data
    });
    
    if (result?.error) {
      alert(result.error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#CA0808]">Sign In</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CA0808] focus:ring-[#CA0808]"
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
              {...register('password', { required: 'Password is required' })}
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CA0808] focus:ring-[#CA0808]"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message?.toString()}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#CA0808] text-white py-2 px-4 rounded-md hover:bg-[#B30707] transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Add sign-up option */}
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-[#CA0808] hover:text-[#B30707] font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}