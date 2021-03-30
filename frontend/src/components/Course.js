import Ta from "./Ta"

const Course = ({ tas, code, state }) => {
    return (
        <>
            <h3>{code}</h3>
            {tas.map(ta => (		
                <Ta ta={ta}/>				
            ))}
            <a>{state}</a>
        </>	
    )
  }
  
  export default Course