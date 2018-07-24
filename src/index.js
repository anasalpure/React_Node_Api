import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker'
//import 'bootstrap/dist/css/bootstrap.min.css';
import Services  from './components/Service/Services.jsx';
import NavMenu  from './components/Navbar/NavMenu';




const App=()=>{

  return (
    <React.Fragment>
        <NavMenu />
        <Services  />
    </React.Fragment>
  );

}

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();