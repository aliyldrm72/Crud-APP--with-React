import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentModal from "./componentss/StudentModal";

function App() {
  const [students, setStudents] = useState(null);
  const [showForm, setShowform] = useState(false);
  const [stnName, setStnName] = useState("");
  const [stnNumber, setStnNumber] = useState("");
  const [stnSurname, setStnSurname] = useState("");
  const [stnClass, setStnClass] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [didUpdate, setDidUpdate] = useState(false);
  const [searchText, setSearchText] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    number: "",
    name: "",
    surname: "",
    class: "",
  });
  const [selectFilter, setSelectFilter] = useState('byName');

  useEffect(() => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        setStudents(response.data);
      })

      .catch((error) => {});
  }, [didUpdate]);

  if (students === null) {
    return <h1>Looding Please wait</h1>;
  }

  //DELETE
  const handleDelete = (studentId) => {
    axios
      .delete(`http://localhost:3004/students/${studentId}`)
      .then((response) => {
        setDidUpdate(!didUpdate);
        // const filteredStudents = students.filter(
        //   (item) => item.id !== studentId
        // )
        //setStudents(filteredStudents);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //BUG İF THE STUDENT HAVE SAME NUMBER

  const hasStudent = students.find((item) => item.number === stnNumber);
  if (hasStudent !== undefined) {
    alert("There is another Student with this Number");
  }

  const handleAdd = (event) => {
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
    //DELETE

    const newStudent = {
      id: String(new Date().getTime()),
      number: String(stnNumber),
      name: stnName,
      surname: stnSurname,
      class: stnClass,
    };
    console.log(newStudent);

    axios
      .post("http://localhost:3004/students", newStudent)
      .then((response) => {
        setStudents([...students, newStudent]);
        setShowform(false);
        setStnName("");
        setStnNumber("");
        setStnSurname("");
        setStnClass("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var filteredStudents = [];

  if (selectFilter === "byName") {
    filteredStudents = students.filter((item) => {
      if (item.name.toLowerCase().includes(searchText.toString().toLowerCase()))
        return true;
    });
  }
  if (selectFilter === "bySurname") {
    filteredStudents = students.filter((item) => {
      if (item.surname.toLowerCase().includes(searchText.toString().toLowerCase()))
        return true;
    });
  }
  if (selectFilter === "byNumber") {
    filteredStudents = students.filter((item) => {
      if (item.number.toLowerCase().includes(searchText.toString().toLowerCase()))
        return true;
    });
  }
  if (selectFilter === "byClass") {
    filteredStudents = students.filter((item) => {
      if (item.class.toLowerCase().includes(searchText.toString().toLowerCase()))
        return true;
    });
  }
  

  return (
    <div >
      <nav className=" navbar navbar-dark bg-primary">
        <div className=" container-fluid">
          <a className="navbar-brand " href="#">
            Crud App
          </a>
        </div>
      </nav>

      <div className="container my-5   ">
        <div className="d-flex justify-content-between ">
          <div className="d-flex w-75 mx-5 ">
            <select
              defaultValue={selectFilter}
              
              onClick={(event) => {
                setSelectFilter(event.target.value);
              }}
              className="form-select w-25"
            >
              <option value="byName">Search By Name</option>
              <option value="bySurname">Search By Surname</option>
              <option value="byNumber">Search By Number</option>
              <option value="byClass">Search By Classname</option>
            </select>

            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Type to search..."
              type="text"
              className="form-control w-75"
            />
          </div>

          <button
            onClick={() => setShowform(!showForm)}
            className=" btn btn-primary w-25 "
          >
            Add a Student
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="w-50 h-5 mx-auto ">
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
            <div className="btn d-flex mx-auto">
              <button className="btn btn-outline-primary mx-auto" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Student Number</th>
            <th scope="col">Student Name</th>
            <th scope="col">Student Surname</th>
            <th scope="col">Student ClassName</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((students) => (
            <tr key={students.id}>
              <th>{students.number}</th>
              <td>{students.name}</td>
              <td>{students.surname}</td>
              <td>{students.class}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(students.id);
                  }}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setSelectedStudent(students);
                  }}
                  className="btn btn-sm btn-secondary"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {showModal && (
          <StudentModal
            students={students}
            selectedStudent={selectedStudent}
            setShowModal={setShowModal}
            didUpdate={didUpdate}
            setDidUpdate={setDidUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default App;
