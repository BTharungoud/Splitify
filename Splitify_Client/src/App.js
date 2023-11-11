import './App.css';
import Homepage from './Pages/Homepage/Homepage';
import Loginpage from './Pages/Signup page/Loginpage';
import Splitpage from './Pages/SplitPDFpage/Splitpage';
import { Route,Routes } from 'react-router-dom';
import SplitedPDF from './Pages/SplitedPDFpage/SplitedPDF';
import Dashboard from './Pages/Dashboardpage.js/Dashboard';
import {Toaster} from  "sonner";
function App() {
  return (
    <>
    <Toaster richColors/>
    <Routes>
      <Route exact path='/' element={<Homepage/>}/>
      <Route path='/Login' element={<Loginpage/>}/>
      <Route path='/SplitPDF' element={<Splitpage/>}/>
      <Route path='/SplitedPDF' element={<SplitedPDF/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </>
  );
}

export default App;
