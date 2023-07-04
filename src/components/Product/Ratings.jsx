import React from 'react'

function Ratings(num) {
    console.log(num.num)
function getStarRating(num) {

        const roundedNumber = Math.round(num.num);
        switch (roundedNumber) {
          case 1:
            return <h1> ⭐☆☆☆☆</h1>;
            
          case 2:
            return <h1> ⭐⭐☆☆☆</h1>;
            
          case 3:
            return <h1> ⭐⭐⭐☆☆</h1>;
            
          case 4:
            return <h1> ⭐⭐⭐⭐☆</h1>;
            
          case 0:
            return <h1> ☆☆☆☆☆</h1>;
            
          default:
            return <h1> ⭐⭐⭐⭐⭐</h1>;
        }
      }
   
  return (
    <div>  {getStarRating (num)}</div>
  
      
    
  )
}

export default Ratings