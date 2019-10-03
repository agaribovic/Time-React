import config from '../../config'

const post = (data) => {

   return fetch(config.apiService + 'contact',
   {
       method: 'POST',
       headers: {
           'Content-Type':'application/json',
       },
       body: JSON.stringify(data)
   })
   .then(response => { return response.json() })
   .catch(reason => { console.log(reason)})
 }

 export default { post }  

