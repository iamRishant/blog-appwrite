import React from 'react'

const   Button = ({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor="text-white",
    className="",
    ...props

}) => {
  return (
    <button className={`px-4 py-2 rounded  ${textColor} ${bgColor} ${className}`} {...props}>{children}</button>
  )
}

export default Button

// this is a custom button jisme sirf apne hisaab se kucch bhi paas kar skte hai children means name of the button 
// and ...props agar user kucch bhi alg se property agar dena chahe to wo 
