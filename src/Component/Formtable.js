import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'
import 'bootstrap/dist/css/bootstrap.min.css';

const Formtable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addContainer">
         
          <form onSubmit={handleSubmit}>
          <div className="close-btn" onClick={handleclose}><MdClose/></div>
            <label htmlFor="name">NAME</label>
            <input type="text" id="name" name="name" required onChange={handleOnChange} value={rest.name}/>
            <label htmlFor="name">EMAIL</label>
            <input type="text" id="email" name="email" required onChange={handleOnChange} value={rest.email}/>
            <label htmlFor="name">MOBILE</label>
            <input type="text" id="mobile" name="mobile" required onChange={handleOnChange} value={rest.mobile}/>
           
            <button className="btn">SUBMIT</button>
          </form>
         </div>
  )
}

export default Formtable