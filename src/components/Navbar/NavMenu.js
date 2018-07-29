import React from 'react';

import Navbar  from './Navbar';
import NavbarBrand  from './NavbarBrand';
import NavbarToggler  from './NavbarToggler';
import Collapse  from './Collapse';
import './navbar.css'
import Dropdown from './DropDown/Dropdown';


class NavMenu  extends React.Component {
    constructor(props) {
        super(props);
      
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


    render() { 
        return ( 
          <Navbar color="dark" dark expand="md" className ="no-select" >
              <NavbarBrand href="/">ALWESAL</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />

              <Collapse isOpen={this.state.isOpen} onEntered={()=>{console.log('i am opened')}} navbar> 
        
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  
                  <Dropdown nav/>

                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                  </li>
                </ul>
            
              </Collapse>
          </Navbar>

         );
    }
}
 
export default NavMenu ;

/***
 * <div className="collapse navbar-collapse" id="navbarSupportedContent">
 */