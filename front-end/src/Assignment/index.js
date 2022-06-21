import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const AssignmentView = () => {
   const assignmentsID= window.location.href.split("/assignments/")[1];
   const [jwt, setJwt] = useLocalState("", "jwt");
   const [assignments,setAssignments]=useState();
  
   useEffect(()=>{
        fetch("/api/assignments/"+assignmentsID,{
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${jwt}`
            },
            method:"GET"
        }).then((response)=>{
            if(response.status===200) return response.json()
        }).then((data)=>{
            setAssignments(data);
            console.log("data: ");
            console.log(data);
        })
    },
    [])

    function handleBranch(event){
        const {branch}=event.target.value;
    }
    function handleGithubURL(event){
        const githubURL=event.target.value;
    }

    return (
        <div>
            <h1 className="assignmentsID">Assignment{' '+assignmentsID}</h1>
            {assignments? (
                <h1>Assignment status:{' '+assignments.status}</h1>
            ):<></>}
           <h1> <label htmlFor='branch'>Branch: <input id='branch' onChange={handleBranch}/></label><br></br></h1>
            <h1><label htmlFor='githubURL'>GithubURL: <input id='githubURL' onChange={handleGithubURL()}/></label></h1>
        </div>
    );
};

export default AssignmentView;