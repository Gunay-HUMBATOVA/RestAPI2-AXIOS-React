import { Component } from "react";
import axios from "axios";
// import { nanoid } from "nanoid";
import "./index.css";

export default class Employees extends Component {
  state = {
    employeesData: [{}],
    clickedData: [{}],
    disabledButton: true
  };

  componentDidMount() {
    const { clickedData } = this.state;

    axios.get("http://localhost:3000/Employees").then(
      (response) => {
        this.setState({ employeesData: response.data });
      },
      (error) => {
        console.log(error);
      }
    );

    clickedData[0] === undefined && (clickedData[0] = "");
  }

  ////******** for modal form styles (open and close windows)
  // TABLE buttons
  handleAddClick = () => {
    this.addEmployeeContainer.classList.value = "openModal";
  };

  handleEditClick = (employeesObj) => {
    const { clickedData } = this.state;
    this.editEmployeeContainer.classList.value = "openModal";
    this.setState({ clickedID: employeesObj.id }, () => {
      const clickedData = this.state.employeesData.filter((employeeObj) => {
        return employeeObj.id === this.state.clickedID && employeeObj;
      });
      this.setState({ clickedData });
    });

    const arrDataToObj = Object.assign({}, clickedData);
    console.log(arrDataToObj[0]);
  };

  handleExit = () => {
    this.addEmployeeContainer.classList.value = "closeModal";
    this.editEmployeeContainer.classList.value = "closeModal";
  };

  //******** */ for data exchange
  // ADD
  handleOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    // const { jobTitleName, firstName, lastName, HiredTime, salary, region, phoneNumber, emailAddress, }
    //   = this.state;
    
    // (jobTitleName !== "" && firstName !== "" && lastName !== '' && HiredTime !== '' && salary !== '' && region !== '' && phoneNumber !== '' && emailAddress !== '')
    Object.keys(this.state).length >= 11 && e.target.checkValidity()
      ? this.setState({ disabledButton: false })
      : this.setState({ disabledButton: true });
  };

  addNewEmployee = async () => {
    const {
      employeesData,
      jobTitleName,
      firstName,
      lastName,
      HiredTime,
      salary,
      region,
      phoneNumber,
      emailAddress,
    } = this.state;
    await axios
      .post("http://localhost:3000/Employees", {
        id: employeesData.length + 1,
        employeeCode: "E" + (employeesData.length + 1),
        jobTitleName,
        firstName,
        lastName,
        HiredTime,
        salary,
        region,
        phoneNumber,
        emailAddress,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.warn(error);
        }
      );

    window.location.reload();
    this.addEmployee.classList.value = "closeChangeEmployeeModal";
  };

  // DELETE
  handleDeleteClick = (e) => {
    const clickedID =
      e.target.parentNode.parentNode.firstChild.innerText.slice(1);

    window.confirm(
      `Are you sure to delete the student with Employee ${clickedID} from the data?\nEither OK or Cancel.`
    ) === true &&
      axios.delete(`http://localhost:3000/Employees/${clickedID}`).then(
        (response) => {
          window.location.reload();
          // this.forceUpdate();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // EDIT
  editAnEmployeeButton = () => {
    const {
      clickedID,
      jobTitleName,
      firstName,
      lastName,
      HiredTime,
      salary,
      region,
      phoneNumber,
      emailAddress,
    } = this.state;

    window.confirm(
      `Are you sure to make changes to the Data in Employee ${clickedID} ?\nEither OK or Cancel.`
    ) === true &&
      axios
        .patch(`http://localhost:3000/Employees/${clickedID}`, {
          id: clickedID,
          employeeCode: "E" + clickedID,
          jobTitleName,
          firstName,
          lastName,
          HiredTime,
          salary,
          region,
          phoneNumber,
          emailAddress,
        })
        .then(
          (response) => {
            window.location.reload();
          },
          (error) => {
            console.warn(error);
          }
        );

    this.editEmployeeContainer.classList.value = "closeModal";
  };

  render() {
    const { employeesData, clickedData, disabledButton } = this.state;
    return (
      <div className="employeesContainer">
        {/* TABLE */}
        <div className="employeesContentWrapper">
          <div className="header">
            <h1>Employees</h1>
            <button onClick={this.handleAddClick}>
              Add a New Employee <span>+</span>
            </button>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Position</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Hired on</th>
                  <th>Salary</th>
                  <th>Region</th>
                  <th>Phone Number</th>
                  <th>Email address</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employeesData.map((employeesObj) => {
                  return (
                    <tr key={+employeesObj.id}>
                      <td>{employeesObj.employeeCode}</td>
                      <td>{employeesObj.jobTitleName}</td>
                      <td>{employeesObj.firstName}</td>
                      <td>{employeesObj.lastName}</td>
                      <td>{employeesObj.HiredTime}</td>
                      <td>{employeesObj.salary}</td>
                      <td>{employeesObj.region}</td>
                      <td>{employeesObj.phoneNumber}</td>
                      <td>{employeesObj.emailAddress}</td>
                      <td>
                        <div
                          className="editContainer"
                          onClick={() => this.handleEditClick(employeesObj)}
                        >
                          <span>Edit</span>
                        </div>
                      </td>
                      <td>
                        <span onClick={this.handleDeleteClick}>Delete</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
        </div>

        {/* ADD */}
        <div ref={(c) => (this.addEmployeeContainer = c)} className="closeModal" >
          <div className="modalDefaultContainer">
            <div className="modalContentWrapper" id="handleErrorMsg">
              <div className="header">
                <h3>Add a new employee</h3>
                <div onClick={this.handleExit} className="exitButton"> x </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="employeeCode">
                  Employee Code
                  <input onChange={this.handleOnchange} type="text" name="employeeCode" value={"E" + (employeesData.length + 1)} readOnly />
                </label>
                <label htmlFor="jobTitleName">
                  Position
                  <input onChange={this.handleOnchange} placeholder="Ex: Major" type="text" name="jobTitleName" required />
                </label>
                <label htmlFor="firstName">
                  First Name
                  <input onChange={this.handleOnchange} placeholder="Ex: Name" type="text" name="firstName" required />
                </label>
                <label htmlFor="lastName">
                  Last name
                  <input onChange={this.handleOnchange} placeholder="Ex: Surname" type="text" name="lastName" required />
                </label>
                <label htmlFor="HiredTime">
                  Hired time
                  <input onChange={this.handleOnchange} placeholder="Ex: Day/Month/Year" type="text" name="HiredTime" required />
                </label>
                <label htmlFor="salary">
                  Salary
                  <input onChange={this.handleOnchange} placeholder="Ex: number" type="number" name="salary" required />
                </label>
                <label htmlFor="region">
                  Place of residence{"(region/city)"}
                  <input onChange={this.handleOnchange} placeholder="Ex: Ottawa" type="text" name="region" required />
                </label>
                <label htmlFor="phoneNumber">
                  Phone number
                  <input onChange={this.handleOnchange} placeholder="Ex: 000-0000000" type="number" name="phoneNumber" required />
                </label>
                <label htmlFor="emailAddress">
                  Email address
                  <input onChange={this.handleOnchange} placeholder="Ex: abc@mail.com" type="email" name="emailAddress" required />
                </label>
                <button onClick={this.addNewEmployee} disabled={disabledButton}>Add</button>
              </form>
              <div className="errorMessage"></div>
            </div>
          </div>
        </div>

        {/* EDIT */}
        <div ref={(c) => (this.editEmployeeContainer = c)} className="closeModal" >
          <div className="modalDefaultContainer">
            <div className="modalContentWrapper" id="handleErrorMsg">
              <div className="header">
                <h3>Edit an employee</h3>
                <div onClick={this.handleExit} className="exitButton"> x </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="employeeCode">
                  Employee Code
                  <input onChange={this.handleOnchange} type="text" name="employeeCode" defaultValue={clickedData[0].employeeCode} readOnly />
                </label>
                <label htmlFor="jobTitleName">
                  Position
                  <input onChange={this.handleOnchange} type="text" name="jobTitleName" defaultValue={clickedData[0].jobTitleName} required />
                </label>
                <label htmlFor="firstName">
                  First Name
                  <input onChange={this.handleOnchange} type="text" name="firstName" defaultValue={clickedData[0].firstName} required />
                </label>
                <label htmlFor="lastName">
                  Last name
                  <input onChange={this.handleOnchange} type="text" name="lastName" defaultValue={clickedData[0].lastName} required />
                </label>
                <label htmlFor="HiredTime">
                  Hired time
                  <input onChange={this.handleOnchange} type="text" name="HiredTime" defaultValue={clickedData[0].HiredTime} required />
                </label>
                <label htmlFor="salary">
                  Salary
                  <input onChange={this.handleOnchange} type="number" name="salary" defaultValue={clickedData[0].salary} required />
                </label>
                <label htmlFor="region">
                  Place of residence
                  {"(region/city)"}
                  <input onChange={this.handleOnchange} type="text" name="region" defaultValue={clickedData[0].region} required />
                </label>
                <label htmlFor="phoneNumber">
                  Phone number
                  <input onChange={this.handleOnchange} type="number" name="phoneNumber" defaultValue={clickedData[0].phoneNumber} required />
                </label>
                <label htmlFor="emailAddress">
                  Email address
                  <input onChange={this.handleOnchange} type="email" name="emailAddress" defaultValue={clickedData[0].emailAddress} required />
                </label>
                <button onClick={this.editAnEmployeeButton}> Save </button>
              </form>
              <div className="errorMessage"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}