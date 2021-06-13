const express = require("express");

//create server
const app = express();
const PORT = 3000;

//set cors header
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    next()
})


//serve static files
app.use(express.static(__dirname + "/static"));

//parse any json data
app.use(express.json());


//custom middleware
function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  if(req.method==="DELETE"){
      let err= new Error("You are not allow to perform such action")
      err.status=403
      next(err)

  }else{
     next();  
  }
 
}

/* let custom = {
  logger: () => {
    return (req, res, next) => {
      console.log(req.method);
      console.log(req.url);
      next();
    };
  },
}; */

app.use(logger);

//server static files
/* app.use(express.static(__dirname+"/build")) */

/* btn.addEventListender("click",(e)=>{

}) */
//endPOINT /Routes
app.get("/", (req, res) => {
  //Route Handler
  //Controller
  /*    res.write()
    res.end() */
  res.sendFile(__dirname + "/index.html");
});

//CRUD OPERATION
// Creat Data
// Read Data
// Update Data
// Delete Data

let users = [
  {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
    avatar: "https://reqres.in/img/faces/7-image.jpg",
  },
  {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar: "https://reqres.in/img/faces/8-image.jpg",
  },
  {
    id: 9,
    email: "tobias.funke@reqres.in",
    first_name: "Tobias",
    last_name: "Funke",
    avatar: "https://reqres.in/img/faces/9-image.jpg",
  },
  {
    id: 10,
    email: "byron.fields@reqres.in",
    first_name: "Byron",
    last_name: "Fields",
    avatar: "https://reqres.in/img/faces/10-image.jpg",
  },
  {
    id: 11,
    email: "george.edwards@reqres.in",
    first_name: "George",
    last_name: "Edwards",
    avatar: "https://reqres.in/img/faces/11-image.jpg",
  },
  {
    id: 12,
    email: "rachel.howell@reqres.in",
    first_name: "Rachel",
    last_name: "Howell",
    avatar: "https://reqres.in/img/faces/12-image.jpg",
  },
];

//Endpoint for getting all users in our db
app.get("/users", (req, res) => {
  res.send(users);
});

//Endpoint to get Single User
app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    res.send(user);
  } else {
    res.send("please provide us with valid id");
  }
});

//EndPoint to add a new user
app.post("/users", (req, res) => {
  console.log(req.body);
  users.push(req.body);

  res.send("user added successfully");
});

//EndPint ro update a specific user
app.patch("/users/:id",(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)

    let user = users.find(item=>item.id===Number(req.params.id))
    console.log(user)

    user= {...user, ...req.body}

    res.send(user)
})

//EndPoint to delete any specific user
app.delete("/users/:id",(req,res)=>{
    users= users.filter(item=>item.id!==Number(req.params.id))
    res.send("delete user")

})


//404 Page not Found Middleware
app.use((req,res,next)=>{
    let err = new Error("Page Not Found")
    err.status=404
    next(err)
})

//error Handler middleware (universal error handler)
app.use((err,req,res,next)=>{
    if(err.status===404){
         res.status(err.status).sendFile(__dirname+"/pageNotFound.html")
    }else{
        res.status(err.status || 500).send({message:err.message})
    }
})

app.listen(PORT, () =>
  console.log("express server is running on port :", PORT)
);
