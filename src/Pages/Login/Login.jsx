import React from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../../Config/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
        let navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const userLogin = await signInWithEmailAndPassword(
        authentication,
        loginDetails.email,
        loginDetails.password
      );
      console.log(userLogin);
       const loginData=await getDoc(doc(db, "recruiters", userLogin.user.uid));
       console.log(loginData)
       const loggedUserData=loginData.data()
       console.log(loggedUserData);
       if(loggedUserData && loggedUserData.role)
       {
        if(loggedUserData.role=="recruiter")
        {
            // console.log(role);
            localStorage.setItem("loggedInRecruiter",JSON.stringify(userLogin))
            
            navigate(`/${loggedUserData.role}Dashboard`)
            
        }
        else {
           localStorage.setItem("loggedInJobseeker",JSON.stringify(userLogin))
            navigate(`/${loggedUserData.role}Dashboard`)
        }
       }
       
      toast.success("Sucessfully loggedin");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <Container className="signup-container">
        <Card className="signup-card">
          <h2 className="signup-title"> NanduTech</h2>

          <Form className="signup-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>📧 Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={loginDetails.email}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>🔒 Password</Form.Label>
              <Form.Control
                type="password"             
                placeholder="Enter your password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <p className="signup-footer">
            {/* Alrehave an account? <a href="/login">Login</a> */}
          </p>
        </Card>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default Login;
