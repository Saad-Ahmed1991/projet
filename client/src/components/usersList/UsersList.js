import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import { deleteUser, editUser } from "../../redux/Actions/userActions";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const UsersList = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  const [edit, setEdit] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const handleDelete = (id) => {
    setIdDelete(id);
    dispatch(deleteUser(id));
  };
  const handleEdit = (id) => {
    setIdDelete(id);
    setEdit(!edit);
  };

  return (
    <div>
      <table className="zui-table">
        <thead>
          <tr>
            <th>_Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>Account Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers
            ? allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    {edit && idDelete === user._id ? (
                      <input
                        size={6}
                        type="text"
                        placeholder={user.firstName}
                        onChange={(e) => {
                          setEditedUser({
                            ...editedUser,
                            firstName: e.target.value,
                          });
                        }}
                        className="admin_edit_input"
                      />
                    ) : (
                      <>{user.firstName}</>
                    )}
                  </td>
                  <td>
                    {edit && idDelete === user._id ? (
                      <input
                        size={6}
                        type="text"
                        placeholder={user.lastName}
                        onChange={(e) => {
                          setEditedUser({
                            ...editedUser,
                            lastName: e.target.value,
                          });
                        }}
                        className="admin_edit_input"
                      />
                    ) : (
                      <>{user.lastName}</>
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {edit && idDelete === user._id ? (
                      <select
                        name="role"
                        id="role"
                        onChange={(e) => {
                          setEditedUser({
                            ...editedUser,
                            role: e.target.value,
                          });
                        }}
                      >
                        <option value="client">Client</option>
                        <option value="worker">Worker</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <>{user.role}</>
                    )}
                  </td>
                  <td>
                    {user.isBanned ? (
                      <span style={{ color: "red", fontWeight: 600 }}>
                        Banned
                      </span>
                    ) : (
                      <span style={{ color: "limegreen", fontWeight: 600 }}>
                        Active
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="action_btn ban_unban_btn"
                      >
                        {edit && idDelete === user._id ? (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <button
                              onClick={() => {
                                dispatch(editUser(editedUser, user._id));
                              }}
                              className="action_btn delete_user_btn"
                            >
                              <SaveIcon style={{ color: "limegreen" }} />
                            </button>
                            <button
                              className="action_btn delete_user_btn"
                              onClick={() => setEdit(false)}
                            >
                              <CloseIcon />
                            </button>
                          </span>
                        ) : (
                          <EditIcon style={{ color: "blue" }} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="action_btn delete_user_btn"
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </button>
                      <button
                        onClick={() => {
                          dispatch(
                            editUser({ isBanned: !user.isBanned }, user._id)
                          );
                        }}
                        className="action_btn ban_unban_btn"
                      >
                        {user.isBanned ? (
                          <div className="ban_unban unban">
                            UNBAN <TaskAltIcon sx={{ color: "limegreen" }} />
                          </div>
                        ) : (
                          <div className="ban_unban">
                            BAN <NotInterestedIcon />
                          </div>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
