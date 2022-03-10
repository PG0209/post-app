import React, { useState, useEffect } from 'react'
import "./componentsStyles/GifPostStyles.css"
import { CgProfile } from 'react-icons/cg';
import { MdOutlineGif } from 'react-icons/md';
import axios from 'axios';
import "./componentsStyles/GifContainerStyles.css"
import GifInText from './GifInText';


const GifPost = () => {
    const [showGifs, setShowGifs] = useState(false)
    const [searchGif, setSearchGif] = useState("")
    const [gifs, setGifs] = useState([])
    const [gifId, setGifId] = useState([ ])
    const [isOpenGif, setIsOpenGif] = useState(false);
   //console.log("gifs:",gifs )

    const {REACT_APP_GIPHY_KEY} = process.env;

    const fetchData = async () =>{
        const response = await axios
        .get("https://api.giphy.com/v1/gifs/trending",{
            params: {
                api_key: REACT_APP_GIPHY_KEY
            }
        }).catch((error) =>{
            console.log("error at fetching data", error);
          });
          setGifs(response.data)
        };

    const handleSearchChange = event => {
        setSearchGif(event.target.value)
      }
    
      const handleSubmit = async () => {
        const response = await axios
        .get("https://api.giphy.com/v1/gifs/search",{
            params: {
                api_key: REACT_APP_GIPHY_KEY,
                q: searchGif
            }
        }).catch((error) =>{
            console.log("error at searching gifs", error);
          })
          setSearchGif(setGifs(response.data));
      };

      const getGifId = (id) => {
        setGifId(id);
      }

      useEffect(() =>{
        fetchData()
         
    }, [ ]);
      
    function removeGif(){
        setIsOpenGif(false);
        window.location.reload()
       
    }

  return (
    <>
    <div className='post-body'>
       <div className='post-page'>
               <div className='options'>
                   <button className='compose-post'>Compose Post</button> 
                   <button className='btn-default'>Photo/Video Album</button>
                   <button className='btn-default'>Live video</button>
                   <button className='btn-default' >Close</button>
               </div>
           <div className='post-container'>
               <div className='post-info'>
                   
                   <div className='profile-icons'>
                       <CgProfile size={40} color={"gray"}/>
                       </div>
                       <div className='profile-post-name'>
                           <h6 className='post-name'>&nbsp; Pradeep Gowda</h6>
                       </div>
                   </div>
                       <div className='post-text'>
                       <form><textarea placeholder='Whats on your mind?'></textarea> </form> 
                       {Object.keys(gifId).length === 0 ?  null : <GifInText  gifId={gifId} openGif={isOpenGif} onCloseGif={()=>removeGif()}/> }
                     </div>
                    
                   <hr/>
                 <div className='post-btns'>
                   <div className='btn-section-1'>
                       <button className='btn-post'><i className="fas fa-images" style={{"color": "#41B35D"}}></i> <span className='btn-name'>Photos/Videos</span></button>
                       <button className='btn-post'><i className="fas fa-smile" style={{"color": "#EAB026"}}></i> <span className='btn-name'>Feeling/Activity</span></button>
                       <button className='btn-post'><i className="fas fa-microphone" style={{"color": "#E42645"}}></i> <span className='btn-name'>Host Q&As</span></button>
                       <button className='btn-post' onClick={()=>setShowGifs(!showGifs)}><MdOutlineGif size={50} className="fas" style={{"color": "#28B19E"}}/> <span className='btn-name'>GIF</span></button>
                     
                   </div>
                    
                   <div className='btn-section-2'>
                       <button className='btn-post'><i className="fas fa-user-tag" style={{"color": "#1771E6"}}></i> <span className='btn-name'>Tag people</span></button>
                       <button className='btn-post'><i className="fas fa-map-marker-alt" style={{"color": "#E94F3A"}}></i> <span className='btn-name'>Check in</span></button>
                       <button className='btn-post'><i className="fas fa-calendar-alt" style={{"color": "#36A6CA"}}></i> <span className='btn-name'>Tag event</span></button>
                       <button className='btn-post'><i className="fas fa-video" style={{"color": "#E42645"}}></i> <span className='btn-name'>Live video</span></button>
                   </div>
                   </div> 
               </div>
               {
                        showGifs ? (
                        <div className='gif-page'><hr/>        
                            <div className='gif-head-section'>
                                <h5 className='gif-head'>Add your post</h5><hr/>
                            </div>
                            <div className='gif-container'>
                            <>
                                {Object.keys(gifs).length === 0 ? (<div>loading...</div>):
                                    <div className='gif-section'>
                                        {
                                            gifs.data.map((items)=>{
                                                return(
                                                    <a href="#" className='image-gifs' key={items.id}>
                                                        <img className="live-gifs" onClick={()=> {getGifId(items.id); setIsOpenGif(true)}} src={items.images.fixed_height.url} alt="..."/>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </>
                            </div>
                            <div className='gif-search'>
                                <form className='form'>
                                    <i onClick={handleSubmit} className="fas fa-search"></i>
                                    <input onChange={handleSearchChange}  value={searchGif} className="searchbar" type="search" placeholder='search' aria-label="Search"/>   
                                </form> 
                            </div>
                        </div>
                  ) : null
                    }
           </div>
         
      </div>
   
</>
  )
}
export default GifPost;