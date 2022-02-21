import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Header = ({ setSearchKey, resetFounded, fetchApi, setLoading })=> {
  const [search, setSearch] = React.useState('')
  const inputRef = React.useRef(null)


  const doQuery = async() => {
    setLoading(true)  
    setSearchKey(search)
    await fetchApi(search, true)
    
    setLoading(false)
  }
  
  const rejectSearch = ()=> {
    toast.error('Invalid Input!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
    
    inputRef.current.placeholder = 'Type here...'
    inputRef.current.focus()
  }

  const canFetch = ()=> {
    let keyword = search
    keyword = keyword.trim()
    if (!keyword) return false
    return true
  }

  const updateQuery = async () => {
    if (!canFetch()) {
      rejectSearch()
      setSearch('')
      return
    }
    await doQuery()
  }

  const enterPressed = async(ev)=> {
    if (ev.key === 'Enter') {
      if (!canFetch()) {
        rejectSearch()
        setSearch('')
        return
      }    
      await doQuery()
    }
    
  }

  return (    
    <>
    <ToastContainer position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover>
    </ToastContainer>
      <header className="header-udemy" style={
        {
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '7vh',
          width: '100vw',
          flexWrap: 'wrap',
          marginBottom: '5rem'
      }}>

            <h1 style={{ color: '#fff'}}>Udemy Courses
            </h1>
            <div className="search-box">
              <input onKeyPress={(ev)=> enterPressed(ev)} style={{
                backgroundColor: '#fafafa',
                border: 'none',
                outline: 'none',
                fontSize: 24,
                padding: 5,
                borderRadius: 4,

                
            }} ref={inputRef} type="text" value={search} onChange={(ev)=> {
              resetFounded()
              setSearch(ev.target.value)
              }} placeholder="Search..." />
            <button className="search-button" style={{
              backgroundColor: '#fafafa'
            }} onClick={updateQuery}>
              <FaSearch style={{
                backgroundColor: '#fafafa', color: '#333'}}/>
            </button>
            </div>
          
      </header>
    </>
  )
}
