//jshint esversion: 6
const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https")
const { stringify } = require("querystring")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))//this function is used to display the css and image from the local like from your haedisk..

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res)
{
    const firname=req.body.fname
    const lastname=req.body.lname
    const email=req.body.email
    // console.log(firname)
    // console.log(lastname)
    // console.log(email)

    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{ 
                    FNAME:firname,
                    LNAME:lastname
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/d2dc3d7198"
    const options={
        method:"POST",
        headers:{
        Authorization:"auth 18aa7e0fd98eb045f4d0fdb35119324e-us21"
        }
    }
   const request= https.request(url,options,function(response)
    {

        if (response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
            // console.log("successfull")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        // response.on("data",function(data)
        // {
        //     console.log(JSON.parse(data))
        // })
         let responseData = '';

        response.on("data", function (chunk) {
            responseData += chunk;
        });

        response.on("end", function () {
            console.log(JSON.parse(responseData));
        });

    })
    request.write(jsonData)
    request.end()
})

app.post("/failure",function(req,res){
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on 4500 ")
})

//api ket
// 0bd4b431c40f3c56033fab17ae1cfbb3-us21
// 0893f7dfebfcf25985c671c23362088a-us21 //new walla geeneratd
//list id
// 40bb1a5f4e
// d2dc3d7198  // new wallsa hai
