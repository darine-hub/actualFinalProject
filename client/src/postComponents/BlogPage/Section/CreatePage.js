import React, {  useState } from 'react'
import QuillEditor from '../../Quill';
import {addNewPost} from '../../../redux/postsSlice'
import { useSelector , useDispatch } from "react-redux";



function CreatePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const [content, setContent] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        if (user.userInfo && !user.isAuth) {
            
            return alert('Please Log in first')
        }

        const variables = {
            content: content,
            userID: user.userInfo._id,
            description:description
 
        }

        dispatch(addNewPost(variables))}

                   


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 > Editor</h1>
            </div>
            <input placeholder="write description..." onChange={e=>setDescription(e.target.value)}/>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            <form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <button
                        size="large"
                        htmlType="submit"
                        className=""
                        onSubmit={onSubmit}
                    >
                        Submit
                </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePage