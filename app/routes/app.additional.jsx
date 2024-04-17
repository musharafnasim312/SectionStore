import { json } from "@remix-run/node";
import { useLoaderData} from "@remix-run/react";
import {Box,Card,Layout,Link,List, Page,Text,BlockStack,} from "@shopify/polaris";
import { create ,getSections  } from "../controllers/SectionStore.js" ;
import CreateSectionForm from "../components/CreateSectionForm.jsx";
import Account from "../components/Account.jsx";
export const loader = async()=>{

  try{
    const data = await getSections()
    return data;
  }

  catch(error){
    return error;
  }
}

export const action = async ({request})=> {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const id = formData.get("id") || undefined; // id is optional
  try{
    const data = await create({title, description,id:id});
    console.log(data);
    return ({data})
  }
  catch(error){
    console.log(error);
    return json({error: "Error"});
  }
}
export default function AdditionalPage() {
  const data = useLoaderData();
  console.log(data);

  const handleDelete = async(id)=>{
    const formData = new FormData
    if(id){
      console.log(id)
    }
    formData.append ("id ",id)
    formData.append ("action","delete")
    try {
      const res = await fetch ('/api/sections',{
        method: "POST",
        body: formData
      })

      const data = await res.json();
      console.log(data)
       
    } 
    catch (error) {
      console.log(error)
      return error;
      
    }

  }

  return (
    <Page>
      <ui-title-bar title="Additional page" />
      <Layout>

       <Layout.Section>
        <card>
          <BlockStack gap = "300">
            <CreateSectionForm/>
          </BlockStack>
        </card>
        </Layout.Section>

        <Layout.Section>
          {data?.map((item, index) =><div key={ item.id}>
        <card>
           <CreateSectionForm item = {item} />
      <button onClick={()=>handleDelete(item.id)}>Delete</button>
        </card>
        </div>)}
        </Layout.Section>
        <Layout.Section>
          <Account/>
        </Layout.Section>
      </Layout>
    </Page>
  );
}



