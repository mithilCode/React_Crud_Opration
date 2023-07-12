import React, { useState } from 'react';
const Crud = () => {
  const [inputdata, setInputData] = useState({
    fname: '',
    lname: '',
    email: '',
    number: '',
    sex: '',
    address: '',
    user: '',
    files: [],
    privacy: false,
  });
  const [inputDataArray, setInputDataArray] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!inputdata.fname.match(/^[A-Za-z]+$/)) {
      errors.fname = 'Only alphabets are allowed';
      isValid = false;
    }
    if (!inputdata.lname.match(/^[A-Za-z]+$/)) {
      errors.lname = 'Only alphabets are allowed';
      isValid = false;
    }
    if ( !inputdata.email.match( /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/ ) ) {
      errors.email = 'Invalid email address';
      isValid = false;
    }
    if (!inputdata.number.match(/^[0-9]{10,15}$/)) {
      errors.number = 'Please enter a valid number (10-15 digits)';
      isValid = false;
    }
    if (inputdata.address.length > 200) {
      errors.address = 'Address should be up to 200 characters';
      isValid = false;
    }
    if (inputdata.files.some((file) => !file.name.endsWith('.pdf'))) {
      errors.files = 'Please select only PDF files';
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputdata.privacy) {
      alert('Please agree to the privacy policy.');
      return;
    }
    if (!validateForm()) {
      return;
    }
    if (editIndex === -1) {
      setInputDataArray((prevDataArray) => [...prevDataArray, inputdata]);
    } else {
      setInputDataArray((prevDataArray) => {
        const updatedArray = [...prevDataArray];
        updatedArray[editIndex] = inputdata;
        return updatedArray;
      });
      setEditIndex(-1);
    }
    setInputData({
      fname: '',
      lname: '',
      email: '',
      number: '',
      sex: '',
      address: '',
      user: '',
      files: [],
      privacy: false,
    });
    setErrors({});
  };
  const handleEdit = (index) => {
    const selectedItem = inputDataArray[index];
    setInputData(selectedItem);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    setInputDataArray((prevDataArray) => {
      const updatedArray = [...prevDataArray];
      updatedArray.splice(index, 1);
      return updatedArray;
    });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setInputData({
      ...inputdata,
      [name]: inputValue,
    });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setInputData({
      ...inputdata,
      files,
    });
  };
  return (
    <section>
      <div className='input_set'>
        <form onSubmit={onSubmit}>
          <div className='input_group'>
            <label>First Name</label>
            <input
              type='text'
              value={inputdata.fname}
              name='fname'
              onChange={handleInputChange}
              required
            />
            {errors.fname && <span className='error'>{errors.fname}</span>}
          </div>
          <div className='input_group'>
            <label>Last Name</label>
            <input
              type='text'
              value={inputdata.lname}
              name='lname'
              onChange={handleInputChange}
              required
            />
            {errors.lname && <span className='error'>{errors.lname}</span>}
          </div>
          <div className='input_group'>
            <label>Email</label>
            <input
              type='email'
              value={inputdata.email}
              name='email'
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className='error'>{errors.email}</span>}
          </div>
          <div className='input_group'>
            <label>Mobile Number</label>
            <input
              type='text'
              value={inputdata.number}
              name='number'
              onChange={handleInputChange}
              required
            />
            {errors.number && <span className='error'>{errors.number}</span>}
          </div>
          <div className='input_group'>
            <label>Sex</label>
            <select value={inputdata.sex} name='sex' onChange={handleInputChange} >
              <option value='' defaultValue hidden>Select</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div className='input_group'>
            <label>Address</label>
            <textarea
              value={inputdata.address}
              name='address'
              onChange={handleInputChange}
              required
            ></textarea>
            {errors.address && (
              <span className='error'>{errors.address}</span>
            )}
          </div>
          <div className='input_group'>
            <label>User</label>
            <div className='radio_group'>
              <label>
                <input
                  type='radio'
                  value='Yes'
                  name='user'
                  checked={inputdata.user === 'Yes'}
                  onChange={handleInputChange}
                />
                Yes
              </label>
              <label>
                <input
                  type='radio'
                  value='No'
                  name='user'
                  checked={inputdata.user === 'No'}
                  onChange={handleInputChange}
                />
                No
              </label>
              <label>
                <input
                  type='radio'
                  value='Other'
                  name='user'
                  checked={inputdata.user === 'Other'}
                  onChange={handleInputChange}
                />
                Other
              </label>
            </div>
          </div>
          <div className='input_group'>
            <label>Upload Files (PDF only)</label>
            <input type='file' multiple onChange={handleFileChange} accept='.pdf' />
            {errors.files && <span className='error'>{errors.files}</span>}
          </div>
          <div className='input_group'>
            <label className='chackbox_set'>
              <input
                type='checkbox'
                name='privacy'
                checked={inputdata.privacy}
                onChange={handleInputChange}
              />
              I agree to the privacy policy
            </label>
            {!inputdata.privacy && errors.privacy && (
              <span className='error'>{errors.privacy}</span>
            )}
          </div>
          <div className='button_group'>
            <button>{editIndex === -1 ? 'Submit' : 'Update'}</button>
          </div>
        </form>
      </div>
      <div>
        <table className='data_table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Sex</th>
              <th>Address</th>
              <th>User</th>
              <th>Files</th>
              <th>Privacy</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {inputDataArray.map((item, index) => (
              <tr key={index}>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.sex}</td>
                <td>{item.address}</td>
                <td>{item.user}</td>
                <td>
                  {item.files.map((file, i) => (
                    <div key={i}>{file.name}</div>
                  ))}
                </td>
                <td>{item.privacy ? 'Agreed' : 'Not Agreed'}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Crud;