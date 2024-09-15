import { useState, useCallback,useEffect,useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [characters, setCharacter] = useState(false)
  const [Password, setPassword] = useState("")

  //ueRef hook
  const passwordRef=useRef(null)
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange()
    window.navigator.clipboard.writeText(Password)
  },[Password])

  const PasswordGenerator = useCallback(() => {

    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"

    if (number) {
      str += "0123456789"
    }
    if (characters) {
      str += "~!@#$%^&*()_+=-,./'][|}{:><`"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, characters, setPassword])


  useEffect(()=>{PasswordGenerator()},[length,number,characters,PasswordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input type="text" value={Password} placeholder='password' className='outline-none w-full py-1 px-3' readOnly ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input type='range' min={4} max={50} className='cursor-pointer ' onChange={(e) => { setLength(e.target.value) }} />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">

            <input type="checkbox" defaultChecked={number} id='numberInput' onChange={() => {
              setNumber((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Number</label>


            <input type="checkbox" defaultChecked={characters} id='characterInput' onChange={() => {
              setCharacter((prev) => !prev);
            }} />
            <label htmlFor="characterInput">Character</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
