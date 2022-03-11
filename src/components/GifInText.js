import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./componentsStyles/GifInText.css"
 
const GifInText = ({gifId, openGif, onCloseGif }) => {

    const [post, setPost] = useState({});

    const {REACT_APP_GIPHY_KEY} = process.env;
    
    const fetchData = async () =>{
          await axios.get(`https://api.giphy.com/v1/gifs/${gifId}`,{
                params: { 
                    api_key: REACT_APP_GIPHY_KEY,
                    gif_id: gifId
                }
            }).catch((error) =>{
                console.log("error at fetching gifID2", error);
              }).then(response => {
                setPost(response.data)
              });
            }

    useEffect(()=>{
        fetchData()
        }, [  ])

        if(!openGif)
         return null;  

        return (
            <div className='gif-section-two'>   
                 {post.data && (
                    <>
                     <div className='image-gifs'>
                       <i className="fas fa-times" onClick={onCloseGif}></i>
                       <img className="live-gifs" src={post.data.images.fixed_height.url} alt="..."/>
                     </div>
                       <button className="text-post-btn">Post</button>
                    </>
                )}
            </div> 
         )
}
export default GifInText;
 