// const express = require("express");

// const server = express(); // this is how you can create express server

// let aboutPath = "/Users/manishsharma/Desktop/Projects/Web-Dev/PepcodingProjects/backend/foodApp/html_file/about.html";
// let indexPath = "/Users/manishsharma/Desktop/Projects/Web-Dev/PepcodingProjects/backend/foodApp/html_file/index.html";
// let error404Path = "/Users/manishsharma/Desktop/Projects/Web Dev/PepcodingProjects/backend/foodApp/html_file/404.html";
// let users = [
//               {
//                             "id" : 1,
//                             "name" : "apple",
//                             "gb" : 64

//               },
//               {
//                             "id" : 2,
//                             "name" : "apple1",
//                             "gb" : 128

//               },
//               {
//                             "id" : 3,
//                             "name" : "apple2",
//                             "gb" : 256

//               }

// ];

// // middleware function for post for converting data which is coming from the frontend to backend
// server.use(express.json());

// server.listen(3000,function (){
//               console.log("server Started");

// });

// server.get("/",function (req,res) {
//               res.sendFile(indexPath);
              
// });


// server.get("/about",getAbout);

// server.get("/aboutme", redirectToAbout);
// // get from backend
// server.get("/ross",function (req,res) {
//               res.sendFile(aboutPath);
              
// });

// // for getting data from backend to  frontend
// server.get("/users",reqQuery);
// // for sending data from frontend to backend
// server.post("/users",postUsers);

// // for update
// server.patch("/users",patchUser);

// //delete
// server.delete("/users",deleteUser);

// // for params

// server.get("/users/:name",receiveParam);

// function receiveParam(req,res){
//               console.log(req.params.name);
//               console.log(req.params);
//               res.send("user id is received" );
// }

// function patchUser(req,res) {
//               console.log("req body --> " ,req.body);
//               for(key in req.body){
//                             users[key] = req.body[key];
//               }

//               res.json({
//                             "messsage" : "message get successfully"
//               });
              
// }

// function deleteUser(req,res) {
//               users = {};
//               res.json({
//                             messsage : "deleted successfully."
//               });

// }

// function postUsers(req,res) {
//               // console.log(req.body);   
//               users = req.body;
//               res.json({
//                             "messsage" : "message received successFully",
//                             // "users" : req.body
//               });           
// }

// function getAbout(req,res) {
//               res.sendFile(aboutPath); // For sending any file
              
// }

// function redirectToAbout(req,res) {
//               res.redirect("/about")
              
// }

// function reqQuery(req,res) {
//               console.log(req.query);
//               res.send(users);
// }



// server.use((req,res) => {
//               res.status(404).sendFile(error404Path); // you need to put this type of fn in the last because the express flow of execution is from top to bottom
// });
