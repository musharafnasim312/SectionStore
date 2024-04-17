import { json } from "@remix-run/node"
import { create,deleteSection} from "../controllers/SectionStore.js" ;

export const loader =async({request}) =>{

    return json({success: true})

}
export const action =async({request}) =>{
    const formData = await request.formData();
    const title = formData.get('title') || " "
    const description = formData.get('description') || " "
    const action = formData.get('action')
    const id =formData.get('id') || " "

    try{
        if (action && action === 'delete'){
          const del = await deleteSection(id)
          if(id){
          
            return json({success: true ,action: 'deleted', data:del})
          }
          return json({success: false, error: "id not provided"})
        }
        const data = await create({title, description, id});
        console.log(data);
        return json({success: true ,action: 'upsert' ,data})
      }
      catch(error){
        console.log(error);
        return json({error: "Error"});
      }
}