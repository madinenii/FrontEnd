import axios from "../axiosConfig"



export const handleRegisterLogin= async(firstName,lastName,dateOfBirth,email,password)=>{
    

    try{
        const response = await axios.post('/participant/registration',
            // firstName,
            // lastName,
            // dateOfBirth,
            // email,
            // password,
            JSON.stringify({ firstName,lastName,dateOfBirth,email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
          );
          console.log(response.data);
        return response.data;
    }catch(e){
        console.error("Registration failed",e.response ? e.response.data : e.message)
        throw e;
    }
    
}