import React from 'react'

export default function Alert(props) {
    const capitalized = (word)=>{
        if(word === "danger"){
            word = "Error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1); 
    }
  return (
    
    <>
      <div className='' style={{height:'20px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalized(props.alert.type)}</strong>:{props.alert.msg}
            
        </div>}
      </div>
    </>
  )
}
