import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';


export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-light border text-black" to="/About">
                            DogoReviews
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-light border text-black" to="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-light border text-black" to="/Books">
                            Books
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-light border text-black" to="/Reviews">
                            Reviews
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
        )      
    }
}



