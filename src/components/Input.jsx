import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
}, ref) {
    const id = useId();

    return (
        <div className='w-full mb-4'>
            {label && <label 
                className='inline-block pl-1 mb-1 text-sm sm:text-base' 
                htmlFor={id}
            >
                {label}
            </label>}
            <input 
                type={type} 
                {...props} 
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white text-black text-sm sm:text-base outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
                id={id} 
                ref={ref} 
            />
        </div>
    )
})

export default Input