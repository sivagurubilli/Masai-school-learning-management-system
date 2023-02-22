// import './App.css';
// import Allroutes from './components/Allroutes';
// import React from 'react';
// import axios from "axios"

// axios.defaults.baseURL = "https://a354-202-142-114-239.in.ngrok.io"
// export default function App(){
//   return (
//     <div className="App">
//       <Allroutes />
//     </div>
//   );
// }

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import * as React from 'react';

export default function App() {
    return <DateTimePickerComponent id="datetimepicker" placeholder="Select a date and time"/>;
}
