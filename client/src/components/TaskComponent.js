import { getUsers } from "../redux/userSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { afficheTask, postNewTask } from "../redux/taskSlice";
import "../styleCss/HomePage.css";
import { Link } from "@material-ui/core";
import BarreNavigationHome from "./BarreNavigationHome";
const TaskComponent = ({ match, history }) => {
  const user = useSelector((state) => state.user);

  const task = useSelector((state) => state.task);

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(Number(step + 1));
  };

  const prevStep = () => {
    setStep(Number(step - 1));
  };

  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState({});

  useEffect(() => {
    dispatch(afficheTask());
    if (user.isAuth) {
      dispatch(getUsers());
    } else {
      history.push("/login");
    }
  }, [user.isAuth]);

  const projectId = match.params.id;

  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value,
      project: projectId,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewTask(taskInput));
  };

  return (
    <body>
      <div class="main-container">
        <BarreNavigationHome />
        <div class="middle-container container">
          <div class="task block">
            <h2 class="titular"> ADD TASK</h2>
            <form class="registration-form">
              {step === 1 ? (
                <div>
                  <div class="input-container">
                    <input
                      type="text"
                      name="name"
                      placeholder="TITLE"
                      class="password text-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div class="input-container">
                    <input
                      type="text"
                      name="description"
                      placeholder="DESCRIPTION"
                      class="password text-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div class="input-container">
                    <label className="label"> Start-Date</label> <br />
                    <input
                      type="date"
                      name="startDate"
                      min="2021-01-01"
                      max="2021-12-31"
                      placeholder="START DATE"
                      class="password text-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div class="input-container">
                    <label className="label"> Deadline</label> <br />
                    <input
                      type="date"
                      name="deadLine"
                      min="2021-01-01"
                      max="2021-12-31"
                      placeholder="DEADLINE"
                      class="password text-input"
                      onChange={handleChange}
                    />
                  </div>

                  <div class="text-center">
                    <a class="sign-in button" onClick={nextStep}>
                      Next
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="employee">
                    {user.users &&
                      user.users.map((el) => (
                        <div>
                          <img className="task-img" src={el.image} />
                          <input
                            type="radio"
                            value={el._id}
                            name="employee"
                            onChange={handleChange}
                          />{" "}
                          {el.firstName} {el.lastName}
                        </div>
                      ))}
                  </div>

                  <br />

                  <div class="text-center">
                    <a class="sign-in button" onClick={prevStep}>
                      {" "}
                      Previous
                    </a>

                    <Link to={"/listProject"}>
                      {" "}
                      <a class="sign-in button" onClick={handleSubmit}>
                        Add Task
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </div>

          <h1 style={{ color: "white" }}>
            {task.taskErrors && task.taskErrors._message}
          </h1>
          <a href={`/singleProject/${projectId}`}>back</a>
        </div>
      </div>
    </body>
  );
};

export default TaskComponent;
