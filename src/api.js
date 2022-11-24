import axios from 'axios'
const url='http://localhost:3000'
class ApiService {
    async CreateTask(){
        try{
            const response = await axios.post(`${url}/api/create_task`,{name:'',state:'currentTasks'})
            return response.data
        }catch (e){
            console.log(e)
        }

    }
    async GetTasks(){
        try{
            const response= await axios.get(`${url}/api/get_tasks`)
            return response.data
        }catch(e){
            console.log(e)
        }
    }
    async UpdateTask(task){
        try{
            const response = await axios.put(`${url}/api/update_task`,task)
            console.log(response)
        }catch (e){
            console.log(e)
        }

    }
    async DeleteTask(id){
        try{
            const response = await axios.delete(`${url}/api/delete_task${id}`)
            console.log(response)
        }catch (e){
            console.log(e)
        }

    }
}
export default new ApiService()