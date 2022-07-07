import React, { useEffect, useState } from 'react';
import { IPost } from '../model/post.model';
import { useFetch } from "../Hooks/useFetch";
import UserService from '../API/UserService';

const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>();
  
    const [fetchPosts, isPostsLoading, postsError] = useFetch(async () => {
        const response = await UserService.getPosts();
        setPosts(response.data);
    })

    useEffect(() => {
        fetchPosts();
    },[])

    return (
        <div>
            <h1>Posts:</h1>
            { isPostsLoading
                ?   <h1>Loading ...</h1>
                :   <div style={{textAlign:'justify'}}>
                        {posts?.map(postItem =>
                            <div key={postItem.id} style={{margin: 15, padding: 15, border:'1px solid black'}}>
                                <h1>{postItem.id} - {postItem.title}</h1>
                                <div>{postItem.body}</div>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
};

export default Posts;