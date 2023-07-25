import { useState } from 'react';
import './App.css';
import copyIcon from './assets/copy.png';
import { message } from 'antd';

function App() {

  const [length, setLength] = useState(0);
  const [value, setValue] = useState('');

  const [passwordInclude, setPasswordInclude] = useState({
    isNumber: false,
    isSpecialChar: false,
    isLowerCase: false,
    isUpperCase: false
  })

  const generateNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
  }
  const generateUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
  }
  const generateLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
  }
  const generateSpecialChar = () => {
    return String.fromCharCode(Math.floor(Math.random() * 14 + 33));
  }

  let password = '';

  const generatePassword = (e) => {
    e.preventDefault();

    const passwordType = {
      isNumber: generateNumber,
      isSpecialChar: generateSpecialChar,
      isUpperCase: generateUpperCase,
      isLowerCase: generateLowerCase
    };

    if (!length || length < 0) return '';

    let filteredTypes = Object.entries(passwordInclude).filter(pass => pass.includes(true))

    filteredTypes = Object.keys(Object.fromEntries(filteredTypes));

    if (filteredTypes.length < 1) return '';

    for (let x = 0; x < length; x += filteredTypes.length) {
      filteredTypes.forEach(element => {
        password = password + passwordType[element]();
      });
    }
    setValue(password.slice(0, length))

    return password.slice(0, length);
  }

  const handleLength = (e) => {
    setLength(e.target.value)
  }

  const handleChange = (e) => {
    setPasswordInclude({
      ...passwordInclude,
      [e.target.name]: e.target.checked
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    message.success("Copied to clipboard")
  }
  return (
    <div className='h-screen'>
      <h1 className='text-gray-700 text-5xl font-bold mb-7'>Password Generator</h1>

      <form className='bg-blue-300 text-black font-bold  p-8 flex flex-col shadow-xl rounded-md max-w-lg mx-auto' onSubmit={generatePassword}>
        <div className=' h-14 p-4 mb-2 bg-white relative'>
          <p className=' overflow-x-auto mr-8 no-scrollbar'>{value}</p>

          <div onClick={handleCopy} className="absolute right-2 top-3 h-10 w-8">
            <img src={copyIcon} alt="" />
          </div>
        </div>

        <div className=' flex self-end items-center'>
          <input className='w-32 p-2 mr-3 mb-2 text-black' type="number" name="length" onChange={handleLength} />
          <label className='text-red-600' for="number">Password Length</label>
        </div>

        <div className="flex m-2">
          <input className='w-4 mx-4' type="checkbox" id='number' name='isNumber' onChange={handleChange} />
          <label for="number">Include Number</label>
        </div>

        <div className="flex m-2">
          <input className='w-4 mx-4' type="checkbox" id='lowercase' name='isLowerCase' onChange={handleChange} />
          <label for="number">Include LowerCase</label>
        </div>

        <div className="flex m-2">
          <input className='w-4 mx-4' type="checkbox" id='uppercase' name='isUpperCase' onChange={handleChange} />
          <label for="uppercase">Include UpperCase</label>
        </div>

        <div className="flex m-2">
          <input className='w-4 mx-4' type="checkbox" id='spectialchar' name='isSpecialChar' onChange={handleChange} />
          <label for="specialchar">Include SpecialCharacter</label>
        </div>

        <button className='mt-5 text-white bg-cyan-950 p-4 rounded-lg text-2xl' type='submit'>Generate Password</button>
      </form>
    </div>
  )
}

export default App
