import './App.css';
import Allroutes from './Components/Allroutes';
import React from 'react';
import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080"
function App(){
  return (
    <div className="App">
      <Allroutes />
    </div>
  );
}

export default App;


// import * as yup from 'yup';
// import { useFormik } from "formik"
// import React from "react"

// interface IFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// const validationSchema = yup.object().shape({
//   firstName: yup.string().required('First name is required'),
//   lastName: yup.string().required('Last name is required'),
//   email: yup.string().email('Invalid email address').required('Email is required'),
//   password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
// });

// const initialValues: IFormData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
// };

// const onSubmit = async (values: IFormData) => {
//   console.log(values);
// };

// export default function App() {
//   const { handleSubmit, handleChange, values, errors } = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return (
//     <>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="firstName">First Name</label>
//         <input type="text" name="firstName" onChange={handleChange} value={values.firstName} />
//         {errors.firstName && <div>{errors.firstName}</div>}
//       </div>
//       <div>
//         <label htmlFor="lastName">Last Name</label>
//         <input type="text" name="lastName" onChange={handleChange} value={values.lastName} />
//         {errors.lastName && <div>{errors.lastName}</div>}
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input type="email" name="email" onChange={handleChange} value={values.email} />
//         {errors.email && <div>{errors.email}</div>}
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input type="password" name="password" onChange={handleChange} value={values.password} />
//         {errors.password && <div>{errors.password}</div>}
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//     </>
//   );
// }
