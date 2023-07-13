import React, { useState, useEffect } from "react";

const Crud = () => {
  const [inputdata, setInputData] = useState({
    fname: '',
    lname: '',
    email: '',
    number: '',
    gender: '',
    liveindia: '',
    address: '',
    files: [],
    agree: false,
  });
  const [inputdataArray, setInputDataArray] = useState([]);
  const[editData,setEditData]=useState(-1);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!inputdata.agree){
        alert("Please Accept Policy");
        return;
    }
    if(editData===-1){
      setInputDataArray((prevDataArray) => [...prevDataArray, inputdata]);
    }else{
      setInputDataArray((prevDataArray)=>{
        const updatedArray=[...prevDataArray];
        updatedArray[editData]=inputdata;
        return updatedArray;
      })
    }
    setEditData(-1);
    setInputData({
      fname: '',
      lname: '',
      email: '',
      number: '',
      gender: '',
      liveindia: '',
      address: '',
      files: [],
      agree: false,
    })
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    console.log(inputValue);
    setInputData({
      ...inputdata,
      [name]: inputValue,
    })
  }
  const handelFile = (e) => {
    const files = Array.from(e.target.files);
    setInputData({
      ...inputdata,
      files,
    })
  }
  const handleEdit = (index) => {
    const selectedItem=inputdataArray[index];
    setInputData(selectedItem);
    setEditData(index)
  }
  const handleDelete = (index) => {
    setInputDataArray((prevDataArray)=>{
      const upDateArray=[...prevDataArray];
      upDateArray.splice(index,1);
      return upDateArray;
    })
    setInputData({
      fname: '',
      lname: '',
      email: '',
      number: '',
      gender: '',
      liveindia: '',
      address: '',
      files: [],
      agree: false,
    })
  }
  console.log(inputdata.agree);
  useEffect(() => {
    console.log(inputdataArray);
  }, [inputdataArray]);
  return (
    <section className="form_input">
      <div className="part_1">
        <form className="input_set" onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" name="fname" value={inputdata.fname} onChange={handleChange} required />
          <input type="text" placeholder="Last Name" name="lname" value={inputdata.lname} onChange={handleChange} required />
          <input type="email" placeholder="Email" name="email" value={inputdata.email} onChange={handleChange} required />
          <input type="number" placeholder="Number" name="number" value={inputdata.number} onChange={handleChange} required />
          <select name="gender" value={inputdata.gender} onChange={handleChange} required>
            <option value="" defaultValue hidden>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="yes">
            <p> Are your live in India ?</p>
            <label className="radio_set" htmlFor="yes">
              <input type="radio" id="yes" name="liveindia" value="Yes" checked={inputdata.liveindia == "Yes"} onChange={handleChange} required />
              Yes
            </label>
            <label className="radio_set" htmlFor="no">
              <input type="radio" id="no" name="liveindia" value="No" checked={inputdata.liveindia == "No"} onChange={handleChange} required />
              No
            </label>
          </div>
          <input type="file" multiple onChange={handelFile} required />
          <textarea name="address" placeholder="Address" value={inputdata.address} onChange={handleChange} required></textarea>
          <div className="chackebox_set">
            <input type="checkbox" name="agree" checked={inputdata.agree} onChange={handleChange} id="agree"/>
            <label htmlFor="agree">Accept Term & Agrement</label>
          </div>
          <button>Submit</button>
        </form>
      </div>
      <div className="part_2">
        <table border="2">
          <thead>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
              <td>Number</td>
              <td>Gender</td>
              <td>Live in india</td>
              <td>Address</td>
              <td>Files</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {inputdataArray.map((tabelFields, index) => {
              return (
                <tr key={index}>
                  <td>{tabelFields.fname}</td>
                  <td>{tabelFields.lname}</td>
                  <td>{tabelFields.email}</td>
                  <td>{tabelFields.number}</td>
                  <td>{tabelFields.gender}</td>
                  <td>{tabelFields.liveindia}</td>
                  <td>{tabelFields.address}</td>
                  <td>{tabelFields.files.map((file, i) => {
                    return (
                      <pre key={i}>
                        {file.name}
                      </pre>
                    )
                  })}</td>
                  <td><button onClick={() => handleEdit(index)}>Edit</button><button onClick={() => handleDelete(index)}>Delete</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Crud;
