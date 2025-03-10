
import formData from './formData.json'
import Form from './Informed/Form'


function App() {


  return (
    <>
     <div>
      {/* <InstallmentForm/> */}
      {/* <InformedForm formData={formData}/> */}
      <Form formData={formData}/>
 
     </div>
    </>
  )
}

export default App
