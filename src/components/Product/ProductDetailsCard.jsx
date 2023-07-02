import React, { useState } from 'react'

function ProductDetailsCard({setOpen, product}) {

 const [count, setCount] = useState(1);
 const [click, setClick] = useState(false);
 const [select, setSelect] = useState(false);

 
    return (
    <div className='bg-[#fff]'>
        {
            product ? (
                <div className='fixed w-full h-screen top-0 left-0 bg-[#0000030]z-40 items-center justify-between '></div>
            ) :null
        }
        

        
    </div>
  )
}

export default ProductDetailsCard