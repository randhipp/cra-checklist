import ky from "ky";
import { getToken } from "../../Utils/Common";

export default async function deleteChecklist(id) {
    const headers = {
        authorization: "Bearer " + getToken(),
      };
  
    let URL = `https://checklists.wafvel.com/api/v1/checklists/${id}`;
    try {
        await ky.delete(URL, { headers: headers }).json();
    } catch (error) {
        console.log(error)
    }
  }

