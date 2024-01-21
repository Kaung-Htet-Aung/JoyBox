export const SIGNUP ='SIGNUP';

export const signup =(email,password)=>{
   return async dispatch=>{
   const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyC60Ho2pTnapksVBRb93yAg-fi2CTcJYVU',
       {
           method:'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body:{
               email:email,
               password:password,
               returnSecureToken:true
           }
       })
       if(!response.ok){
           throw new Error("something went wrong")
       }
       const resData =response.json();
       dispatch({type:SIGNUP})
   }
}