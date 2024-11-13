import { commomApi } from "./commonApi"
import { serverurl } from "./severUrl"

// register
export const registerApi = async(reqBody)=>{
    return await commomApi('POST',`${serverurl}/register`,reqBody,"")
}

// login

export const loginApi = async(reqBody)=>{
    return await commomApi('POST',`${serverurl}/login`,reqBody,"")
}

// add project

export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commomApi('POST',`${serverurl}/add-project`,reqBody,reqHeader)
}

// get home project

export const homeProjectApi = async()=>{
    return await commomApi('GET',`${serverurl}/home-project`)
}
// get all project

export const getAllProjectApi = async(searchkey,reqHeader)=>{
    // query parameter = baseurl?key=value
    return await commomApi('GET',`${serverurl}/all-project?search=${searchkey}`," ",reqHeader)
}

// get user project

export const getUserProjectApi = async(reqHeader)=>{
    return await commomApi('GET',`${serverurl}/user-project`,'',reqHeader)
}

// to remove userproject

export const removeUserPRojectApi = async(id,reqHeader)=>{
    return await commomApi('DELETE',`${serverurl}/remove-userproject/${id}`,{},reqHeader)
}

// api to update the project

export const updateUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commomApi('PUT',`${serverurl}/update-userproject/${id}`,reqBody,reqHeader)
}

// to update profile

export const updateUserProfileApi = async(reqBody,reqHeader)=>{
    return await commomApi('PUT',`${serverurl}/update-userprofile`,reqBody,reqHeader)
}

