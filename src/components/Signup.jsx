// RESPONSIVE SIGNUP PAGE
import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import { login } from '../store/authReducer.jsx'
import {Button, Input} from './Index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
                alert("Sign up success")
                window.location.reload(false)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 sm:py-12">
        <div className={`mx-auto w-full max-w-md bg-gray-100 rounded-xl p-6 sm:p-10 border border-black/10`}>
            <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-sm sm:text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-4 sm:mt-8 text-center text-sm sm:text-base">{error}</p>}

            <form onSubmit={handleSubmit(create)} className="mt-8">
                <div className='space-y-4 sm:space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,})}
                    />
                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup