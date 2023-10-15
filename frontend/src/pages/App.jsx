import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // Install and import axios for making API requests
import Footer from "../components/Footer";

const App = () => {
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tasksList, setTasksList] = useState([]);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get-tasks?username=${loggedInUser}`)
      .then((response) => {
        if (response.data.success) {
          setTasksList(response.data.tasks);
        }
      });
  }, []);

  const handleDateClick = (date) => {
    if (isSelectingStartDate) {
      setStartDate(date);
      setIsSelectingStartDate(false);
    } else {
      setEndDate(date);
      setIsSelectingStartDate(true);
    }
  };

  const handleSubmit = () => {
    if (task && startDate && endDate) {
      const newTask = {
        task,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

     axios
       .post("http://localhost:5000/add-task", {
         username: loggedInUser,
         task: newTask,
       })

       .then((response) => {
         if (response.data.success) {
           setTasksList((prevTasks) => [...prevTasks, newTask]);
           setTask(""); // Reset the task input
         }
       });
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-2xl font-semibold mb-5">Add your task</h1>

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
          className="border p-2 rounded mb-4"
        />

        <div className="mb-4">
          <DatePicker
            inline
            selected={isSelectingStartDate ? startDate : endDate}
            onChange={handleDateClick}
            dayClassName={(date) => {
              if (date.getTime() === startDate?.getTime()) return "start-date";
              if (date.getTime() === endDate?.getTime()) return "end-date";
              return "";
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-5 text-center">Tasks List</h2>
        <ul className="space-y-4">
          {tasksList.map((taskItem, index) => {
            const { task, startDate, endDate } = taskItem;

            const formattedStartDate = new Date(startDate).toLocaleDateString();
            const formattedEndDate = new Date(endDate).toLocaleDateString();

            return (
              <li
                key={index}
                className="border p-4 rounded-md shadow-lg space-y-2"
              >
                <div className="font-bold text-lg">{task}</div>
                <div>
                  <span className="font-medium">Start:</span>{" "}
                  {formattedStartDate}
                </div>
                <div>
                  <span className="font-medium">End:</span> {formattedEndDate}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
