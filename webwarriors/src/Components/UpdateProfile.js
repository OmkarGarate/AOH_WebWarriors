    import React, { useEffect, useState } from 'react';
    import '../css/profile.css';
    import { Link, Outlet } from 'react-router-dom';
    import prev from "../Images/prev.png";  
    import profBg from '../Images/ems-imgs/sp-bg.jpg';
    import profileImg from '../Images/ems-imgs/sd-pr.jpeg';
    import { useAuthContext } from '../hooks/useAuthContext';
    import profBgImg from '../Images/profBg.jpg'
    import profileDefault from '../Images/profileDefault.png'
    import useUpdateContext from '../hooks/useUpdateContext';

    function UpdateProfile() {
        const {user} = useAuthContext()
        const [username, setUsername] = useState('')
        const [email, setEmail] = useState('')
        const [bio, setBio] = useState('')
        const [userProfile, setUserProfile] = useState(profileDefault);
        const [userProfileImg, setUserProfileImg] = useState('');
        const [userPoster, setUserPoster] = useState(profBgImg); 
        const [errorM, setErrorM] = useState(null)
        const [conf, setConf] = useState("");
        const [userData, setUserData] = useState('')

        const {update, error, isLoading} = useUpdateContext()
        console.log("Username",user)

        useEffect(() => {
        const fetchData = async () =>{
            const response = await fetch(`http://localhost:5001/users/singleuser/${user.user._id}`)
            
            const json = await response.json()
            // console.log(json)
            if(response.ok)
            {
                setUserData(json)
                setUsername(json.username)
                setEmail(json.email)
                setBio(json.bio)
            }
            
        }

        if(user){
            fetchData()
        }
        }, [user])
        // console.log(user._id)
        
        // const handleSubmit = async (e) =>{
        //     e.preventDefault();

        //     // await update( userProfile, username, email, bio);

        //     if(!error){
        //         setConf("Successfully Updated!!")
        //     }
        //     const formData = new FormData()
        //     formData.append("userProfile", userProfile)
        //     // formData.append("userPoster", userPoster)
        //     formData.append("username", username)
        //     formData.append("email", email)
        //     formData.append("bio", bio)
        //         try{
        //         const response = await fetch(`http://localhost:5001/users/updateprofile/${user.user._id}`, {
        //             method: "PATCH",
        //             body: formData
        //         })

        //         const json = await response.json()

        //         if (!response.ok) {
        //             setErrorM(json.error || "Failed to update blog post");
        //         } else {
        //             setUsername(username)
        //             setEmail(email)
        //             setBio(bio)
        //             setUserProfile(userProfile)
        //             setUserPoster(userPoster)
        //             setErrorM(null);
        //             console.log("Updated profile data", json);
        //             setConf("Successfully Updated profile data")
        //         }
        //     } catch (error) {
        //         console.error("Error during form submission:", error);
        //         setErrorM("Error during form submission. Please try again later.");
        //     }
        // }

        const handleSubmit = async (e) => {
            e.preventDefault();
          
            const formData = new FormData();
            formData.append("uploaded_file", userProfile);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("bio", bio);
          
            try {
              const response = await fetch(`http://localhost:5001/users/updateprofile/${user.user._id}`, {
                method: 'PATCH',
                body: formData
              });
          
              const json = await response.json();
              console.log("updated",json)
          
              if (!response.ok) {
                setErrorM(json.error || "Failed to update profile");
              } else {
                setErrorM(null);
                // console.log("Updated blog post", json);
                setConf("Successfully Updated a profile")
              }
            } catch (error) {
              console.error("Error during form submission:", error);
              setErrorM("Error during form submission. Please try again later.");
            }
          };
          const handleChange = (e) => {
            if (e.target.name === "uploaded_file") {
                const file = e.target.files[0];
                if (file) {
                    setUserProfile(file);
                    setUserProfileImg(URL.createObjectURL(file)); 
                }
            }
        };
        
        return (
            <div className='profilePage'>
                <Link to={"/profilePage "}><button className='backBtn'><img src={prev} alt="next" /></button></Link>
                {userData ?(
                    <form className="prof1" onSubmit={handleSubmit} encType="multipart/form-data"
                    >
                                <img src={profBgImg} alt="profBg" className='profBg'/>
                            {/* <div className="prfBg">
                                <img src={userPoster} alt="posterUrl" className='profBg'/>
                                <label htmlFor="fileUpload2">
                                        Choose file
                                        <input
                                        type="file"
                                        className="form-control-file"
                                        id='fileUpload2'
                                        // name="uploaded_file2"
                                        onChange={(e) => {
                                            // setPoster(e.target.files[0])
                                            setUserPoster(URL.createObjectURL(e.target.files[0]));
                                        }}
                                        />
                                </label>
                            </div> */}
                            <div className="profDesc">
                                <div className="prfImg">
                                    {/* <img src={posterUrl === "" ? defaultEvent : posterUrl} alt="" /> */}
                                    {/* <img src={userProfile} alt="profileImg" className='profileImg'/> */}
                                    <img src={userProfileImg === '' ? `http://localhost:5001/uploads/${userData.userProfile}` : userProfileImg} alt="profileImg" className='profileImg'/>
                                    {/* <img src={`http://localhost:5001/uploads/${userData.userProfile}`} alt="profileImg" className='profileImg'/> */}
                                    <label htmlFor="fileUpload">
                                        Choose file
                                        <input
                                        type="file"
                                        className="form-control-file"
                                        id='fileUpload'
                                        name="uploaded_file"
                                        onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="prd">
                                    <label htmlFor="username">Username: </label>
                                    <input type='text' className='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                    <label htmlFor="email">Email:</label>
                                    <input type='text'  className='userHandle' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <label htmlFor="bio">Bio:</label>
                                    <input type='text' value={bio} onChange={(e)=>setBio(e.target.value)}/>
                                </div>
                            </div>
                            <div className="fsb">
                            <button className="vag">Save</button>
                            {!errorM && errorM!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{errorM}</div>) }
                            </div>
                        </form>
                ):(null)}
                
            </div>
        );
    }

    export default UpdateProfile;
