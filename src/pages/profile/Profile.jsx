import React, { useState } from 'react'
import './profile.module.css'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { updateuser } from '../../redux/feutures/AuthSlice';
import { useNavigate } from 'react-router-dom';
const Profile = () => {

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:7000/images/"
    const { link } = useSelector((state) => state.link)
    const { user } = useSelector((state) => state.auth)
    const User = user.user;
    // console.log(user);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            userId: User._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post(`${link}/upload`, data);
            } catch (err) { }
        }
        try {
            const res = await axios.put(`${link}/user/` + User._id, updatedUser);
            setSuccess(true);
            // localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res.data);
            dispatch(updateuser({ user: res.data }))
            navigate('/')
            // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            // dispatch({ type: "UPDATE_FAILURE" });
        }
    };
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : PF + User.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            asas
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={User.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder={User.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>
            {/* <Sidebar /> */}
        </div>
    );
}

export default Profile
