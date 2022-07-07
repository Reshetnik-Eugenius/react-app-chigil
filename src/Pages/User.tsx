import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../API/UserService';
import { IUser } from '../Components/Users/IUser';
import { useFetch } from '../Hooks/useFetch';
import { IPost } from '../model/post.model';
import { initialValue } from '../Components/Users/initialUser';

const User = () => {
  const params = useParams();
  const [user, setUser] = useState<IUser>(initialValue);
  const [posts, setPosts] = useState<IPost[]>();
  const [fetchUserById, isLoading, error] = useFetch(async () => {
      const response = await UserService.getUserById(Number(params.id));
      setUser(response.data);
  })
  const [fetchPosts, isPostsLoading, postsError] = useFetch(async () => {
      const response = await UserService.getPostsByUserId(Number(params.id));
      setPosts(response.data);
  })

  useEffect(() => {
      fetchUserById(); 
      fetchPosts();
  },[])

  return (
      <div>
          { isLoading
              ?   <h1>LoADING ...</h1>
              :   <div>
                      <h1>UserIdPage OPEN! ID={params.id}</h1>
                      <h3>{user.name}</h3>
                      <h3>{user.email}</h3>
                  </div>
          }

          <h1>Posts:</h1>
          { isPostsLoading
              ?   <h1>LoADING ...</h1>
              :   <div>
                      {posts?.map(postItem =>
                          <div key={postItem.id} style={{marginTop: 15}}>
                              <h1>{postItem.title}</h1>
                              <div>{postItem.body}</div>
                          </div>
                      )}
                  </div>
          }
      </div>
  );
};

export default User;