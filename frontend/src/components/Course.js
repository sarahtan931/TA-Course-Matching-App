import Ta from "./Ta"

const Course = ({ tas, code }) => {
    return (
        <>
            <h3>{code}</h3>
            {tas.map(ta => (		
                <Ta ta={ta}/>				
            ))}
        </>	
    )
  }
  
  export default Course