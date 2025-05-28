import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import "./SignUp.css";
import { authentication, db } from "../../Config/firebaseConfig";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [signupDetails, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupDetails);
    try {
      const userRegister = await createUserWithEmailAndPassword(
        authentication,
        signupDetails.email,
        signupDetails.password
      );

      updateProfile(userRegister.user,{
        displayName:signupDetails.name
      })
      console.log(userRegister);
      await setDoc(doc(db, `${signupDetails.role}s`, signupDetails.name), {
        email: signupDetails.email,
        name: signupDetails.name,
        role: signupDetails.role,
        id: Date.now(),
      });
      toast.success("Sucessfully Registered");

      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <Container className="signup-container">
      <Card className="signup-card">
        <h2 className="signup-title"> Job Finder</h2>

        <Form className="signup-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={signupDetails.name}
              onChange={(e) =>
                setSignUp({ ...signupDetails, name: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>📧 Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={signupDetails.email}
              onChange={(e) =>
                setSignUp({ ...signupDetails, email: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>🔒 Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={signupDetails.password}
              onChange={(e) =>
                setSignUp({ ...signupDetails, password: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>🎭 Role</Form.Label>
            <Form.Select
              value={signupDetails.role}
              onChange={(e) =>
                setSignUp({ ...signupDetails, role: e.target.value })
              }
              required
            >
              <option value="">choose your role</option>

              <option value="recruiter">Recruiter</option>
              <option value="jobseeker">Job Seeker</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>

        <p className="signup-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default SignUp;
