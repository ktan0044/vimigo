import logo from "./logo.svg";
import "./App.css";
import { AccordionCollapse, Button, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

function App() {
  const [resultDescriptor, setDescription] = useState("");
  const [readMessage, setReadMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [createMessage, setCreateMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  function handleRead() {
    if (readMessage == "") {
      getAllRead();
    } else {
      getById(readMessage);
    }
  }

  function handleDelete() {
    deleteById(deleteMessage);
  }

  function handleUpdate() {
    updateField();
  }

  function handleCreate() {
    createUser();
  }

  const updateField = async () => {
    let temp;
    try {
      temp = JSON.parse(updateMessage);
    } catch (err) {
      setDescription(() => {
        return (
          <div>
            <h4>Invalid JSON string</h4>
          </div>
        );
      });
      return false;
    }
    await axios
      .put(
        "https://gorest.co.in/public/v2/users/" +
          temp["id"] +
          "?access-token=1493fa22bc4e4dbc05a7b8d7d2a58edfd6f23f38d21e6a19ac65bec78d1f4593",
        temp
      )
      .then((res) => {
        setDescription(() => {
          return (
            <div>
              <h1>Success</h1>
            </div>
          );
        });
      })
      .catch((err) => {
        setDescription(() => {
          console.log(err);
          return errorResponse(err);
        });
      });
  };

  const createUser = async () => {
    let temp;
    try {
      temp = JSON.parse(updateMessage);
    } catch (err) {
      setDescription(() => {
        return (
          <div>
            <h4>Invalid JSON string</h4>
          </div>
        );
      });
      return false;
    }
    await axios
      .post(
        "https://gorest.co.in/public/v2/users" +
          "?access-token=1493fa22bc4e4dbc05a7b8d7d2a58edfd6f23f38d21e6a19ac65bec78d1f4593",
        JSON.parse(createMessage)
      )
      .then((res) => {
        setDescription(() => {
          return (
            <div>
              <h1>Success</h1>
            </div>
          );
        });
      })
      .catch((err) => {
        setDescription(() => {
          console.log(err);
          return errorResponse(err);
        });
      });
  };

  const getAllRead = async () => {
    await axios
      .get(
        "https://gorest.co.in/public/v2/users" +
          "?access-token=1493fa22bc4e4dbc05a7b8d7d2a58edfd6f23f38d21e6a19ac65bec78d1f4593"
      )
      .then((res) => {
        let resArr = [];
        for (let i = 0; i < res.data.length; i++) {
          resArr.push(
            <div>
              <h5>Id : {res.data[i].id}</h5>
              <h5>Name : {res.data[i].name}</h5>
              <h5>Email : {res.data[i].email}</h5>
              <h5>Gender : {res.data[i].gender}</h5>
              <h5>Status : {res.data[i].status}</h5>
            </div>
          );
        }
        setDescription(() => {
          return resArr;
        });
      })
      .catch((err) => {
        setDescription(() => {
          console.log(err);
          return errorResponse(err);
        });
      });
  };

  const deleteById = async (id) => {
    await axios
      .delete(
        "https://gorest.co.in/public/v2/users/" +
          id +
          "?access-token=1493fa22bc4e4dbc05a7b8d7d2a58edfd6f23f38d21e6a19ac65bec78d1f4593"
      )
      .then((res) => {
        setDescription(() => {
          return (
            <div>
              <h1>Success</h1>
            </div>
          );
        });
      })
      .catch((err) => {
        setDescription(() => {
          console.log(err);
          return errorResponse(err);
        });
      });
  };

  const getById = async (id) => {
    await axios
      .get(
        "https://gorest.co.in/public/v2/users/" +
          id +
          "?access-token=1493fa22bc4e4dbc05a7b8d7d2a58edfd6f23f38d21e6a19ac65bec78d1f4593"
      )
      .then((res) => {
        setDescription(() => {
          return (
            <div>
              <h5>Id : {res.data.id}</h5>
              <h5>Name : {res.data.name}</h5>
              <h5>Email : {res.data.email}</h5>
              <h5>Gender : {res.data.gender}</h5>
              <h5>Status : {res.data.status}</h5>
            </div>
          );
        });
      })
      .catch((err) => {
        setDescription(() => {
          console.log(err);
          return errorResponse(err);
        });
      });
  };

  function handleReadChange(event) {
    setReadMessage(event.target.value);
  }

  function handleDeleteChange(event) {
    setDeleteMessage(event.target.value);
  }

  function handleCreateChange(event) {
    setCreateMessage(event.target.value);
  }

  function handleUpdateChange(event) {
    setUpdateMessage(event.target.value);
  }

  function errorResponse(error) {
    let errorCode = error.response.status;
    let info = "";
    console.log(errorCode == 404);
    switch (errorCode) {
      case 404:
        info = "Resource does not exist";
        break;
      case 400:
        info = "Bad request made";
        break;
      case 401:
        info = "Authentication failed, provide valid token id";
        break;
      case 403:
        info = "Authenticated user not allowed to access endpoint";
      case 422:
        info = "Data validation failed, provide valid data input";
      case 429:
        info = "Too many data requests";
    }
    return (
      <div>
        <h4>Status code : {errorCode}</h4>
        <br></br>
        <p>Info : {info}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div class="outer-container">
        <div class="inner-container">
          <div class="inner-separate">
            <div>
              <div class="title">Inputs</div>
              <div class="description">
                <div class="description-pos">
                  <div>
                    <div>Create</div>
                    <input
                      id="createId"
                      placeholder="e.g. 4513, 4514"
                      onChange={handleCreateChange}
                      value={createMessage}
                    ></input>
                  </div>
                  <button class="submitButtons" onClick={handleCreate}>
                    Submit
                  </button>
                </div>
                <div class="description-pos">
                  <div>
                    <div>Read</div>
                    <input
                      id="readId"
                      placeholder="e.g. 4513, 4514"
                      onChange={handleReadChange}
                      value={readMessage}
                    ></input>
                  </div>
                  <button class="submitButtons" onClick={handleRead}>
                    Submit
                  </button>
                </div>
                <div class="description-pos">
                  <div>
                    <div>Update</div>
                    <input
                      id="updateId"
                      placeholder="e.g. 4513, 4514"
                      onChange={handleUpdateChange}
                      value={updateMessage}
                    ></input>
                  </div>
                  <button class="submitButtons" onClick={handleUpdate}>
                    Submit
                  </button>
                </div>
                <div class="description-pos">
                  <div>
                    <div>Delete</div>
                    <input
                      id="deleteId"
                      placeholder="e.g. 4513, 4514"
                      onChange={handleDeleteChange}
                      value={deleteMessage}
                    ></input>
                  </div>
                  <button class="submitButtons" onClick={handleDelete}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div class="separate-item">
              <div class="title">Sample Input</div>
              <div class="description">
                <div class="inner-description-pos">
                  <div>
                    Create :
                    <div>
                      {
                        '{"name":"James Corden", "email":"jamescorden@test.com","status":"inactive", "gender":"male"}'
                      }
                    </div>{" "}
                  </div>

                  <div>
                    Read :
                    <div>
                      {
                        "e.g. 1932, 5102 #IMPORTANT(only one id or none for displaying all)"
                      }
                    </div>
                  </div>
                  <div>
                    Update :
                    <div>
                      {
                        '{"id":"2342","name":"James Corden", "email":"jamescorden@test.com","status":"inactive", "gender":"male"}'
                      }
                    </div>
                    <div>
                      <i>
                        <b>ID is a must while the rest are optional</b>
                      </i>
                    </div>
                  </div>
                  <div>
                    Delete :
                    <div>
                      {
                        "e.g. 1932, 5102 #IMPORTANT(Must have id before submitting)"
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inner-container">
          <div>
            <div class="title">Results will be shown her</div>
          </div>
          <div class="description">{resultDescriptor}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
