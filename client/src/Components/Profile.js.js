import React, { useState, useRef, useEffect,useContext ,Component } from "react";
import * as ReactBootstrap from "react-bootstrap";
import "./style.css";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from 'react-hook-form';






const Profile = (props) => {

  const { register, handleSubmit } = useForm() 

  const [user,setUser] = useState({ username:"", email: "", phone: "",id:props.match.params.id,image:""});
  // const [image, setImage] = useState();



  const [message,setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  let timerID = useRef(null);

  

 

  useEffect(() => {
    
AuthService.profile(user).then(data=>{
        const { message } = data;
  
  setUser(data.user);
  console.log(data);
       
    });
  
   
    return ()=>{
        clearTimeout(timerID);
    }
},[]);


// const onChange = e => setImage(URL.createObjectURL(e.target.files[0]));

// const onSubmit = (data) => {
//   console.log(data)
// }


const uploadFileHandler = (e) => {
  // setImage(URL.createObjectURL(e.target.files[0]));
  // console.log(e.target.files[0]);
  e.preventDefault();
  // const file = e.target.files[0];

  //console.log(e.target.files[0]);
  AuthService.upload(user).then(data=>{
    const { message } = data;
  
    console.log(message)


}






  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const onSubmit = e =>{
    e.preventDefault();
    
    AuthService.update_user(user).then(data=>{
      const { message } = data;
      setMessage(message);
      console.log(message)
       
       
    });
}
  return (
    <>
        <ReactBootstrap.Row>

          <ReactBootstrap.Col sm={6} className="middle">
            <div style={{ marginLeft: "10px" }}>
              <ReactBootstrap.Card
                style={{ background: "#343a40", color: "white" }}
              >
                <ReactBootstrap.Card.Header>
                  User Profile
                </ReactBootstrap.Card.Header>
                <ReactBootstrap.Card.Body>
                  <ReactBootstrap.Form onSubmit={onSubmit}>
                    <ReactBootstrap.Form.Group controlId="formBasicEmail">
                      <ReactBootstrap.Form.Label>
                        User Name
                      </ReactBootstrap.Form.Label>
                      <ReactBootstrap.Form.Control
                        type="text"
                        name="username"
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Username"
                        value={user.username}
                        
                        
                       
                      />
                    </ReactBootstrap.Form.Group>

                    <ReactBootstrap.Form.Group controlId="formBasicPassword">
                      <ReactBootstrap.Form.Label>
                        Email
                      </ReactBootstrap.Form.Label>
                      <ReactBootstrap.Form.Control
                        type="email"
                        name="email"
                        onChange={onChange}
                        className="form-control"
                      placeholder="Enter email"
                      value={user.email}
                      />
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Group controlId="formBasicCheckbox">
                      <ReactBootstrap.Form.Group controlId="formBasicPassword">
                        <ReactBootstrap.Form.Label>
                          Phone Number
                        </ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control
                          type="phone"
                          name="phone"
                          onChange={onChange}
                          className="form-control"
                        placeholder="Enter Password"
                        value={user.phone}
                        />
                      </ReactBootstrap.Form.Group>
                      <ReactBootstrap.Form.Group controlId="formBasicCheckbox"></ReactBootstrap.Form.Group>
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Button
                      variant="primary"
                      type="submit"
                      variant="warning"
                    >
                      Update
                    </ReactBootstrap.Button>
                  </ReactBootstrap.Form>
                  { message ? <Message message={message} /> : null}
                </ReactBootstrap.Card.Body>
              </ReactBootstrap.Card>
            </div>
          </ReactBootstrap.Col>
          <ReactBootstrap.Col sm={6} className="middle">
            <ReactBootstrap.Card
              style={{ background: "#343a40", color: "white" }}
            >
              <ReactBootstrap.Card.Header>
                KYC Verification
              </ReactBootstrap.Card.Header>
              <ReactBootstrap.Card.Body>
                <ReactBootstrap.Row>
                  <ReactBootstrap.Col xs={6} md={6}>
                  
                    <ReactBootstrap.Form.Group controlId="formBasicEmail">
                      <ReactBootstrap.Form.Label>
                        Pan Number
                      </ReactBootstrap.Form.Label>
                      <ReactBootstrap.Form.Control
                        type="_pannumber"
                        name="_pannumber"
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Pan Number"
                      />
                    </ReactBootstrap.Form.Group>

                    <ReactBootstrap.Form.File id="formcheck-api-regular">
                      <ReactBootstrap.Form.File.Label>
                        Regular file input
                      </ReactBootstrap.Form.File.Label>


                      <ReactBootstrap.Form.File.Input name="image"  onChange={onChange} />
             


                    </ReactBootstrap.Form.File>
                  </ReactBootstrap.Col>
                  <ReactBootstrap.Col xs={6} md={6}>

                  <ReactBootstrap.Form.Group controlId="formBasicEmail">
                      <ReactBootstrap.Form.Label>
                        Adhar Number
                      </ReactBootstrap.Form.Label>
                      <ReactBootstrap.Form.Control
                        type="_adharnumber"
                        name="_adharnumber"
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Adhar Number"
                      />
<br/>
<ReactBootstrap.Form.File id="formcheck-api-regular">
                      <ReactBootstrap.Form.File.Label>
                        Regular file input
                      </ReactBootstrap.Form.File.Label>


                      <ReactBootstrap.Form.File.Input  name="image1"  />
                    


                    </ReactBootstrap.Form.File>
                  
                  
                    </ReactBootstrap.Form.Group>

  <ReactBootstrap.Button variant="primary" type="submit" variant="warning" style={{float: "right"}} onClick ={uploadFileHandler}>
                                Register
  </ReactBootstrap.Button>



                  </ReactBootstrap.Col>
                </ReactBootstrap.Row>
              </ReactBootstrap.Card.Body>
            </ReactBootstrap.Card>
          </ReactBootstrap.Col>






         

        </ReactBootstrap.Row>
      
    </>
  );
};

export default Profile;

// import React from 'react'
// import './style.css';

// const Profile = props=>{
//     return(

// <div>
//    <form class="form-group">

//           <br/> <br/><br/>

//            <h3 style={{textAlign: 'center'}}>User Profile</h3>

//     <div class="container">

// <div class="row">
//     <div class="col-sm" >

//             <div class="col-sm">
//             <label for="formGroupExampleInput2">Another label</label>
//            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
//            </div>

//            <br/>

//            <div class="col-sm">
//             <label for="formGroupExampleInput2">Another label</label>
//            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
//            </div>

//            <br/>

//            <div class="col-sm">
//             <label for="formGroupExampleInput2">Another label</label>
//            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
//            </div>
//    </div>

//     <div class="col-sm" >
//          <label for="formGroupExampleInput2">Another label</label>
//           <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>

//           <br/>

//           <label for="formGroupExampleInput2">Another label</label>
//           <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
//      </div>

// </div>

// </div>

// </form>

// </div>

//     )
// }

// export default Profile;
