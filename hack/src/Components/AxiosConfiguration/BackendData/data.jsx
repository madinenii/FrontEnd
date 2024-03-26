// import axios from "../axiosConfig"


// export const handleLogin= async(email,password)=>{
//     try{
//         const response = await axios.post(`/participant/user/login?email=${email}&password=${password}`)
//         console.log(response.data);
//         return response.data;
//     }catch(e){
//         console.error("Login failed",e.response ? e.response.data : e.message)
//         throw e;
//     }
    
// }


import axios from "../axiosConfig"

export const handleLogin = async (email, password, role) => {
    try {
        const response = await axios.post(`/participant/user/login?email=${email}&password=${password}&role=${role}`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.error("Login failed", e.response ? e.response.data : e.message)
        throw e;
    }
}