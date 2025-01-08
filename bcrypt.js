const bcrypt = require('bcrypt');

const password = 'yourPassword123'; // The plain text password
let hashGenrate=async() => {
    const hash = bcrypt.hash(password, 10);
    return await hash;
};
let hashCompare=async(hashPassword,password) => {
    const hash = bcrypt.compare(password,hashPassword);
    return await hash;
};

(async ()=>{
    let hashPassword=await hashGenrate();
    const password1 = 'yourPassword123'; // The plain text password
    let compare_result=await hashCompare(hashPassword,password1);
    console.log(hashPassword);
    console.log(compare_result);
})()








