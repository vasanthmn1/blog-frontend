import React from 'react'
import { useState } from "react";
import classes from './write.module.css'
import axios from "axios";
import { useSelector } from 'react-redux';
import { FcAddImage } from 'react-icons/fc'

const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useSelector((state) => state.auth)
    const { link } = useSelector((state) => state.link)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.poto = filename;
            try {
                await axios.post(`${link}/upload`, data);
            } catch (err) { }
        }
        try {
            const res = await axios.post(`${link}/post/create`, newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) { }
    };
    return (
        <div className={classes.write}>
            {file && (
                <img className={classes.writeImg} src={URL.createObjectURL(file)} alt="" />
            )}
            <form className={classes.writeForm} onSubmit={handleSubmit}>
                <div className={classes.writeFormGroup}>
                    <label htmlFor="fileInput">
                        <FcAddImage />
                        {/* <i className="writeIcon fas fa-plus"></i> */}
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className={classes.writeInput}
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className={classes.writeFormGroup}>
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className={classes.writeSubmit} type="submit">
                    Publish
                </button>
            </form>
        </div>
    )
}

export default Write