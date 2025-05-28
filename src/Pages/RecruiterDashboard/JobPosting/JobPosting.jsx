import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
// import { toast } from "react-toastify";
import{updateDoc,arrayUnion,doc} from "firebase/firestore";
import { db } from "../../../Config/firebaseConfig";

const JobPosting = () => {
    const loggedinUser=JSON.parse(localStorage.getItem("loggedInRecruiter"))
    console.log(loggedinUser)
  const [openModel, setOpenmodel] = useState(false);
  const [jobDetails, SetJobDetails] = useState({
    name: "",
    description: "",
    role: "",
  });

  const addJob = () => {
    setOpenmodel(true);
 
  };

  const handleClose = () => {
    setOpenmodel(false);
  };
  const handlejob = async() => {
    //   toast.success("Sucessfully POsted Job");
  
    alert("job posted");
  
    
     console.log(loggedinUser)
     const recruiterDataRef = doc(db,"recruiters",loggedinUser.user.displayName);
     await updateDoc(recruiterDataRef, {
     jobs: arrayUnion(jobDetails)
     }),



    console.log(jobDetails)
     handleClose()   //   setOpenmodel(false)
  };

  return (
    <div>
      <Button variant="primary" onClick={addJob}>
        Add JobPost
      </Button>
      <Modal show={openModel} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form className="signup-form">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label> Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your company name"
              
                onChange={(e) =>
                  SetJobDetails({ ...jobDetails, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as={"textarea"}
                placeholder="Enter your job description"
                
                onChange={(e) =>
                  SetJobDetails({ ...jobDetails, description: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>🎭 Role</Form.Label>
              <Form.Select
                value={SetJobDetails.role}
                onChange={(e) =>
                  SetJobDetails({ ...jobDetails, role: e.target.value })
                }
                required
              >
                <option value="">choose your role</option>

                <option value="frontend">FrontEnd</option>
                <option value="backend">BackEnd</option>
                 <option value="fullstack">FullStack</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlejob}>
            Post Job
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobPosting;
