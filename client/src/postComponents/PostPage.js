import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  formatDistance} from 'date-fns'
import { Typography } from 'antd';
import BarreNavigationHome from "../components/BarreNavigationHome"
import { useSelector } from 'react-redux';


function PostPage({match,history}) {
    const { Title } = Typography
    const [post, setPost] = useState([])
    const postId = match.params.postId;
    const users = useSelector(state=>state.user)
    useEffect(() => {
        if (!users.isAuth) {
          history.push('/login');
        } 
        
      }, [users.isAuth,history]);
    useEffect(() => {

        const variable = { postId: postId }

        axios.post('http://localhost:5000/api/blog/getPost/', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.post)
                    setPost(response.data.post)
                } else {
                    alert('Couldnt get post')
                }
            })
    }, [])
return(
    <>
   <BarreNavigationHome/>
    {(post.writer) ?
    
            <div className="postPage" style={{ width: '80%', margin: '3rem auto' }}>
                <Title level={2}>{post.writer.firstName} {post.writer.lastName}`s Post</Title>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Title level={4}>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</Title>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

            </div>:
  
            <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
        }
</>)
}

export default PostPage