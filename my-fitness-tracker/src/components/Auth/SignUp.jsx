import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const { signUp } = useAuth();

    // Validation schema using Yup
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name must be less than 50 characters')
            .required('First name is required'),
        lastName: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name must be less than 50 characters')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
        age: Yup.number()
            .min(13, 'You must be at least 13 years old')
            .max(120, 'Please enter a valid age')
            .required('Age is required'),
        fitnessLevel: Yup.string()
            .required('Please select your fitness level'),
        acceptTerms: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions')
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            age: '',
            fitnessLevel: '',
            acceptTerms: false
        },
        validationSchema,
        onSubmit: async (values) => {
            setError('');
            setIsLoading(true);

            try {
                // Call signUp function from AuthContext
                await signUp(values);
                navigate('/dashboard'); // Redirect to dashboard after successful signup
            } catch (err) {
                setError(err.message || 'Sign up failed. Please try again.');
                console.error('Sign up error:', err);
            } finally {
                setIsLoading(false);
            }
        }
    });

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-[url(https://static.dw.com/image/60073158_605.jpg)] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join our fitness community by filling in your details below.
                    </p>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-4" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`appearance-none relative block w-full px-3 py-2 border ${
                                    formik.touched.firstName && formik.errors.firstName 
                                        ? 'border-red-300' 
                                        : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                placeholder="John"
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <p className="mt-1 text-xs text-red-600">{formik.errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                required
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`appearance-none relative block w-full px-3 py-2 border ${
                                    formik.touched.lastName && formik.errors.lastName 
                                        ? 'border-red-300' 
                                        : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                placeholder="Doe"
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <p className="mt-1 text-xs text-red-600">{formik.errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`appearance-none relative block w-full px-3 py-2 border ${
                                formik.touched.email && formik.errors.email 
                                    ? 'border-red-300' 
                                    : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="you@example.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-xs text-red-600">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                            Age
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            autoComplete="age"
                            required
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`appearance-none relative block w-full px-3 py-2 border ${
                                formik.touched.age && formik.errors.age 
                                    ? 'border-red-300' 
                                    : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="25"
                            min="13"
                            max="120"
                        />
                        {formik.touched.age && formik.errors.age && (
                            <p className="mt-1 text-xs text-red-600">{formik.errors.age}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700 mb-1">
                            Fitness Level
                        </label>
                        <select
                            id="fitnessLevel"
                            name="fitnessLevel"
                            required
                            value={formik.values.fitnessLevel}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`appearance-none relative block w-full px-3 py-2 border ${
                                formik.touched.fitnessLevel && formik.errors.fitnessLevel 
                                    ? 'border-red-300' 
                                    : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        >
                            <option value="">Select your fitness level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                        {formik.touched.fitnessLevel && formik.errors.fitnessLevel && (
                            <p className="mt-1 text-xs text-red-600">{formik.errors.fitnessLevel}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`appearance-none relative block w-full px-3 py-2 border ${
                                formik.touched.password && formik.errors.password 
                                    ? 'border-red-300' 
                                    : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="••••••••"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="mt-1 text-xs text-red-600">{formik.errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`appearance-none relative block w-full px-3 py-2 border ${
                                formik.touched.confirmPassword && formik.errors.confirmPassword 
                                    ? 'border-red-300' 
                                    : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="••••••••"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">{formik.errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={formik.values.acceptTerms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                                formik.touched.acceptTerms && formik.errors.acceptTerms 
                                    ? 'border-red-300' 
                                    : 'border-gray-300'
                            }`}
                        />
                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                            I accept the <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
                        </label>
                    </div>
                    {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                        <p className="text-xs text-red-600">{formik.errors.acceptTerms}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading || !formik.isValid}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isLoading || !formik.isValid 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            } focus:outline-none`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;