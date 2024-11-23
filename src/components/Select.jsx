import React, { useId } from 'react'

const Select = ({
    options,
    label,
    className="",
    ...props
},ref) => {
    const id=useId()
  return (
    <div className='w-full'>
    {label && <label htmlFor={id}></label> }

    <select id={id} {...props} className={`px-2 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        {options?.map((option,index)=>(
            <option value={option} key={option}>
            {option}
            </option>
        ))}
    </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
// forward ref is same as input wale bss likhen ka tarika alag hai ye wala jyda easy hai

