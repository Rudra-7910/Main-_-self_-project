import api from "../api/axios"
export const getHabits=async()=>{
    const response= await api.get("/habits");
    return response.data;
}
export const createHabit=async(habitData)=>{
    const response= await api.post("/habits",habitData);
    return response.data;
}
export const toggleHabit=async(id)=>{
    const response= await api.put(`/habits/${id}/toggle`);
    return response.data;
}
export const deleteHabit=async(id)=>{
    const response= await api.delete(`/habits/${id}`);
    return response.data;
}
