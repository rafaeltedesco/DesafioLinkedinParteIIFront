import React from 'react'
import './App.css';
import { Header } from './components';
import Api from './services/api.js'
import { AiOutlineArrowRight, AiOutlineArrowLeft  } from 'react-icons/ai'
import { LoadingPage } from './pages';

function App() {
  const [loading, setLoading] = React.useState(true) 
  const [foundCourses, setFoundCourses] = React.useState(-1) 
  const [searchKey, setSearchKey] = React.useState('')
  const [courses, setCourses] = React.useState([])
  const [totalVisibleCourses, setTotalVisibleCourses] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [leftButtonDisabled, setLeftButtonDisabled] = React.useState(true)
  const [rightButtonDisabled, setRightButtonDisabled] = React.useState(false)
  const totalCoursesRegistered = 3678
  const [totalPages, setTotalPages] = React.useState(0)
  const limit = 30
  

  const calculateTotalPages = ()=> {
    setTotalPages(Math.ceil(totalCoursesRegistered, limit))
  }

  const scrollTop = ()=> {
    window.scrollTo(0, 0)
  }

  const resetFounded = ()=> {
    setFoundCourses(-1)
  }

  const goToPreviousPage = ()=> {
    resetFounded()
    setCurrentPage(currentPage - 1)
    if (currentPage <= 2 ) {
      setLeftButtonDisabled(true)
      return
    }
    setRightButtonDisabled(false)
    scrollTop()
  }

  const goToNextPage = () => {
    resetFounded()
    setCurrentPage(currentPage + 1)
    if (currentPage >= totalPages - 1) {
      setRightButtonDisabled(true)
      return
    }
    
    setLeftButtonDisabled(false)
    scrollTop()
  }

  const fetchApi = async(word, queryOn=null)=> {
    setLoading(true)
    const {data: {rowCount, rows}} = await Api.queryWord(word)
    refresh(rows, rowCount)
    if (queryOn) {
      setFoundCourses(rowCount)
    }
    setLoading(false)
  }

  const refresh = (rows, rowCount)=> {
    setCourses(rows)
    setTotalVisibleCourses(rowCount)
    calculateTotalPages()
    setLoading(false)
  }


  const loadDataFromApi = async (page = null, limit = null)=> {
    setLoading(true)
    const {data: { rowCount, rows }} = await Api.get(page && limit ? `?page=${page}&limit=${limit}` : '')
    refresh(rows, rowCount)
  }

  const renderCourses = ()=> {
    return courses.map((course, idx) => {
      return (
        <div key={idx} className="card-container" 
        style={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
            
            }}>
          <div className="card">
            <header className="card-header" style={{ textAlign: 'center', color: '#fff', 
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            height:'140px',
            width: '100%',
            
            }}>
              <div className="course-title-container">
                <h3 className="course-title">
                  { course.course_title }
                </h3>
              </div>
              <div className="course-subject-container">
                <h5 className="course-subject">
                  {course.subject}
                </h5>
              </div>
            </header>
            <div className="card-body" style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              flex: 1,
              color: '#222'
              
            }}>
              <div className="row" style={{
                display: 'flex',
                justifyContent: 'space-around',
                
                
              }}>
                <div className="card-info">
                  <strong>Course id:</strong>
                  <p className="course-detail">
                   {course.course_id}
                  </p>
                </div>
                <div className="card-info">
                  <strong>Content duration:</strong> 
                  <p className="course-detail">
                    {isNaN(Number(course.content_duration)) ? '?' :  Number(course.content_duration).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="row" style={{
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                <div className="card-info">
                  <strong>Level:</strong>
                  <p className="course-detail"> 
                    {course.level}
                  </p>
                </div>
                <div className="card-info">
                  <strong>Total reviews:</strong> 
                  <p className="course-detail">
                    {course.num_reviews}
                  </p>
                </div>
              </div>
              <div className="row" style={{
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                <div className="card-info">
                  <strong>Is Paid:</strong> 
                  <p>
                    {course.is_paid ? 'Yes' : 'No'} 
                  </p>
                </div>
                <div className="card-info">
                  <strong>Price:</strong>
                  <p>
                     {isNaN(Number(course.price)) ? '?' : Number(course.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="row" style={{
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                <div className="card-info">
                  <strong>Total Lectures:</strong>
                  <p>
                    {course.num_lectures}
                  </p>
                </div>
                <div className="card-info">
                  <strong>Total subscribers:</strong> 
                  <p>
                    {course.num_subscribers}
                  </p>
                </div>
              </div>              
            <div className="card-footer" style={{
            
            }}>
              
              <a target="_blank" rel="noreferrer" className="course-link" href={course.url}>
                View Course  
              </a>
            
            </div>
          </div>
        </div>
      </div>
      )
    })
  }


  React.useEffect(()=> {
    loadDataFromApi(currentPage, limit)
  }, [currentPage])

  return loading ? <LoadingPage /> : (
      <>
      <div className="page-info"
          style={
            {
              backgroundColor: "#222",
            }
          }
        >
          
          <div className="arrows" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            {foundCourses >= 0 ? null : (
            <div className="left-arrow">
              <button
                disabled={leftButtonDisabled}
               onClick={goToPreviousPage}><AiOutlineArrowLeft /></button>
            </div>
            )}
            {foundCourses >= 0 ? <h4 style={{ textShadow: '1px 1px #f32383', textTransform: 'uppercase', fontSize: 20, fontWeight: 'bold', color: '#f72585', width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={async ()=> {
              resetFounded()
              loadDataFromApi(currentPage, limit)

              }}>Show All</h4> : <h4 >Current Page: {currentPage} / {totalPages} </h4>}
            <div className="right-arrow">
              {foundCourses >= 0 ? null: (
              <button
                disabled={rightButtonDisabled}
              onClick={goToNextPage}>
                <AiOutlineArrowRight />
              </button>
              )}
            </div>
          </div>
          
        </div>
        <div className="container">
          <Header resetFounded={resetFounded} setLoading={setLoading} setSearchKey={setSearchKey} fetchApi={fetchApi}></Header>
          {foundCourses >= 0 ? ( <div style={{textAlign: 'center', marginTop: '20px'}}>
            <h3>Found {foundCourses} Courses about { searchKey }</h3> 
            </div>
            ) : null }
        
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
          { renderCourses() }
          </div>
          <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
            <h5>Showing {totalVisibleCourses} Courses
            </h5>
          </div>
        </div>
      </>
    );
}

export default App;
