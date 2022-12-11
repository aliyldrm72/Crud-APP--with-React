import React, { useState } from "react";
import "..//assets/css/EditModal.css";

import axios from "axios";

const StudentModal = (props) => {
  const { selectedStudent, setShowModal, students ,didUpdate,setDidUpdate} = props;

  const [stnName, setStnName] = useState(selectedStudent.name);
  const [stnNumber, setStnNumber] = useState(selectedStudent.number);
  const [stnSurname, setStnSurname] = useState(selectedStudent.surname);
  const [stnClass, setStnClass] = useState(selectedStudent.class);

  const handleEdit = (event) => {
    event.preventDefault();

    if (
      stnNumber === "" ||
      stnName === "" ||
      stnSurname === "" ||
      stnClass === ""
    ) {
      alert("Please fill up all gaps");
      return;
    }
    const filteredStudents = students.filter(
      (item) => item.id !==selectedStudent.id
    );
    const hasStudent = filteredStudents.find(
      (item) => item.number === stnNumber
    );

    if (hasStudent !== undefined) {
      alert("This student is registereted.");
      return;
    }

    const updatedStudent = {
      ...selectedStudent,
      name: stnName,
      surname: stnSurname,
      number: stnNumber,
      class: stnClass,
    };
    console.log(updatedStudent)

    axios.put(
      `http://localhost:3004/students/${selectedStudent.id}`,
      updatedStudent
    )
    .then(()=>{
        setShowModal(false)
        setDidUpdate(!didUpdate)
        
    })
    .catch((err)=>{console.log(err)})
  };

  return (
    <div className="container">
      <div className="containerSecond">
        <h1>Student Information</h1>
        <form onSubmit={handleEdit} className="w-50 h-5 mx-auto">
          <div>
            <div className="mb-3  ">
              <label htmlfor="number" className="form-label">
                Number:
              </label>
              <input
                value={stnNumber}
                onChange={(event) => setStnNumber(event.target.value)}
                type="number"
                className="form-control"
                id="stdNmb"
              />
            </div>
            <div className="mb-3  ">
              <label htmlfor="stdNm" className="form-label">
                Name:
              </label>
              <input
                value={stnName}
                onChange={(event) => setStnName(event.target.value)}
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="mb-3  ">
              <label htmlfor="surname" className="form-label">
                Surname:
              </label>
              <input
                value={stnSurname}
                onChange={(event) => setStnSurname(event.target.value)}
                type="text"
                className="form-control"
                id="surname"
              />
            </div>
            <div className="mb-3  ">
              <label htmlfor="class" className="form-label">
                Class No:
              </label>
              <input
                value={stnClass}
                onChange={(event) => setStnClass(event.target.value)}
                type="text"
                className="form-control"
                id="class"
              />
            </div>
            <div
              
              className="btn d-flex mx-auto"
            >
              <button className="btn btn-outline-success mx-auto" type="submit">
                Save
              </button>
              <button onClick={() => setShowModal(false)} type="button" className="btn btn-outline-danger mx-auto">
                close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
