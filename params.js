const express=require('express');
const app=express();
const expressSession=require('express-session');
app.use(expressSession({
    secret: 'your-secret-key',  // Used to sign the session ID cookie
    resave: false,              // Don't resave session if it wasn't modified
    saveUninitialized: true,    // Save uninitialized session to store (e.g. for new users)
    cookie: { secure: false }   // Use 'secure: true' if using https
}));

app.get('/',(req,res)=>{
    res.send('hello');
})


app.get('/welcome/:id',(req,res)=>{

    const url_id=req.params.id;
    let names=['Hari','Ajay','Varun','Arun'];
    if(url_id>names.length-1 || url_id<0){
        res.send('No User Found')
    }
    else{
        names.map((e,i)=>{
            if(url_id===i.toString()){
                res.send(names[i])
            }
        })   
    }
})
app.listen(8080)