import React, { useEffect, useState } from "react";
import { db } from "../../../Config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./MyPostings.css"; 

function MyPostings() {
  const [postedData, setPostedData] = useState([]);
  const [loading, setLoading] = useState(true);
    const loggedUser = JSON.parse(localStorage.getItem("loggedInRecruiter"));


  const handleDelete= async(jobindexr)=>{
    console.log("clicked delete")
    console.log(jobindexr)
    let jobsAfterFilter=postedData.filter((job,index)=>index!==jobindexr)
    
    console.log(jobsAfterFilter);
    const docRef=doc(db,"recruiters",loggedUser.user.displayName)
    await updateDoc(docRef,{
      jobs:jobsAfterFilter

    })
    setPostedData(jobsAfterFilter)
    
    alert("job deleted sucessfully")


  }

  useEffect(() => {
    // const loggedUser = JSON.parse(localStorage.getItem("loggedInRecruiter"));
    const getData = async () => {
      const getDocRef = await getDoc(
        doc(db, "recruiters", loggedUser.user.displayName)
      );

      if (getDocRef.exists()) {
        const data = getDocRef.data();
        console.log(data);
        setPostedData(data.jobs || []);
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <h1 className="loading-text">Loading... please wait...</h1>;
  }

  return (
    <div className="postings-container">
      <h2 className="postings-heading">My Job Postings</h2>
      {postedData.length > 0 ? (
        postedData.map((p, index) => (
          <div key={index} className="posting-card">
            <h3 className="job-title">{p.name}</h3>
            <p className="job-description">{p.description}</p>
            <span className="job-role">{p.role}</span>
            <button onClick={()=>handleDelete(index)}>Delete</button>
          </div>
        ))
      ) : (
        <div className="no-jobs">No jobs posted yet</div>
      )}
    </div>
  );
}

export default MyPostings;
