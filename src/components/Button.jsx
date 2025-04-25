import React from 'react'

const Button = ({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor="text-white",
    className="",
    ...props
}) => {
  return (
    <button 
      type={type}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base md:text-lg w-full sm:w-auto ${textColor} ${bgColor} ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

// this is a custom button jisme sirf apne hisaab se kucch bhi paas kar skte hai children means name of the button 
// and ...props agar user kucch bhi alg se property agar dena chahe to wo