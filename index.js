import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const yourBearerToken ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGE5MmYxZjYyZWZmY2YyNDljZWJjYmVmMDRiNzMzYyIsInN1YiI6IjY0ZDFlMGYyNmQ0Yzk3MDBjYjdmMzA5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qKfu-JKOv1T9jlHrWO6O6FJmnp7QmpW6U35-R3c-20c";
const API_URL="https://api.themoviedb.org/3/discover/movie";

const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/",async (req,res)=>{
    try{

        const result = await axios.get(API_URL,config);
        console.log(result.data);
        const finalres=result.data;
        console.log(finalres.results[0].poster_path);
        res.render("index.ejs",{
            image:finalres.results[0].poster_path,
            title:finalres.results[0].original_title,
            description:finalres.results[0].overview
        });
    }
    catch(error)
    {
        res.render("index.ejs",{content : JSON.stringify(error.response.data)});
    }
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
