import Sentry from 'react-activity/dist/Sentry'

import 'react-activity/dist/Sentry.css'

export const LoadingPage = ()=> {
  return (
    <div style={{
      display: 'flex',
      flex: 1,
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2>
          Loading
        </h2>
          <p>
          <Sentry style={{
            width: '4rem',
            height: '4rem',
            marginTop: '20px'
          }} />
        </p>
      </div>
    </div>
  )
}