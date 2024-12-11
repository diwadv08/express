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
    res.send(`<a href='/welcome'>Go to Home</a>`);
})

app.get('/welcome/:name',(req,res)=>{
    const {name}=req.params;
    req.session.username={name:name};
    console.log(req.session.id);
    res.redirect('/welcome');
})
app.get('/welcome',(req,res)=>{
    if( req.session.username){
        let user=req.session.username.name;
        user=Array.from(user);
        let my1=user[0].toUpperCase();
        user.shift();
        user.unshift(my1)
        user=user.toString();
        user=user.replaceAll(',','')
        res.send(user);
    }
    else{
        res.send('Logged Out!!')
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
app.listen(8080)
