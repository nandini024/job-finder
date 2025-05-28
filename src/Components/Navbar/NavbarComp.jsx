import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarComp.css";
import { signOut, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const NavbarComp = () => {
  const navigate = useNavigate();
  const loggedinUser = JSON.parse(localStorage.getItem("loggedInRecruiter"))||JSON.parse(localStorage.getItem("loggedInJobseekers"));
  console.log( loggedinUser);
  
  const logout = async () => {
    const auth = getAuth();


    try {
      await signOut(auth);
      localStorage.removeItem("loggedInRecruiter");
       localStorage.removeItem("loggedInJobseekers")
      navigate("/login");
      toast.success("Sucessfully LoggedOut");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          💻 NanduTech
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {loggedinUser ? (
              <>
         <button>{loggedinUser.user.displayName}</button>
                <button onClick={logout}> logout</button>
              </>
            ) : (
              <>

                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
