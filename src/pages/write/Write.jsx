import React, { useEffect } from 'react'
import { useState } from "react";
import classes from './write.module.css'
import axios from "axios";
import { useSelector } from 'react-redux';
import { FcAddImage } from 'react-icons/fc'
import { useFormik } from 'formik';

const Write = () => {
    // const [title, setTitle] = useState("");
    // const [desc, setDesc] = useState("");
    // const [file, setFile] = useState(null);
    const { user } = useSelector((state) => state.auth)
    const { link } = useSelector((state) => state.link)


    let myFormik = useFormik({
        initialValues: {
            title: "",
            desc: "",
            file: null,
            username: user.user.username
        },
        validate: (values) => {
            let err = {}

            // if (!values.email) {
            //     err.email = "Enter full email"
            // }
            // if (!values.password) {
            //     err.password = "Enter password"
            // }
            return err
        },

        onSubmit: async (values) => {

            const file = myFormik.values.file
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                myFormik.values.poto = filename;
                console.log(data);
                try {
                    await axios.post(`${link}/upload`, data);
                } catch (err) { }
            }
            try {
                const res = await axios.post(`${link}/post/create`, values);
                window.location.replace("/post/" + res.data._id);
            } catch (err) { }
        }
    })

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newPost = {
    //         username: user.user.username,
    //         title,
    //         desc,
    //     };
    //     if (file) {
    //         const data = new FormData();
    //         const filename = Date.now() + file.name;
    //         data.append("name", filename);
    //         data.append("file", file);
    //         newPost.poto = filename;
    //         try {
    //             await axios.post(`${link}/upload`, data);
    //         } catch (err) { }
    //     }
    //     try {
    //         const res = await axios.post(`${link}/post/create`, newPost);
    //         window.location.replace("/post/" + res.data._id);
    //     } catch (err) { }
    // };

    useEffect(() => {
        console.log(myFormik.values.file)
    }, [])
    console.log(myFormik.values.file);
    return (
        <div className={classes.write}>
            {myFormik.values.file && (
                <img className={classes.writeImg} src={URL.createObjectURL(myFormik.values.file)} alt="" />
            )}
            <form className={classes.writeForm} onSubmit={myFormik.handleSubmit}>
                <div className={classes.writeFormGroup}>
                    <label htmlFor="fileInput">
                        <FcAddImage />
                        {/* <i className="writeIcon fas fa-plus"></i> */}
                    </label>
                    <input
                        name='file'
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        accept='image/*'
                        // onChange={(e) => setFile(e.target.files[0])}
                        onChange={(e) =>
                            myFormik.setFieldValue('file', e.currentTarget.files[0])}
                    />
                    <input
                        name='title'

                        type="text"
                        placeholder="Title"
                        className={classes.writeInput}
                        autoFocus={true}
                        // onChange={e => setTitle(e.target.value)}
                        onChange={myFormik.handleChange}
                    />
                </div>
                <div className={classes.writeFormGroup}>
                    <textarea
                        name='desc'

                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        // onChange={e => setDesc(e.target.value)}
                        onChange={myFormik.handleChange}
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