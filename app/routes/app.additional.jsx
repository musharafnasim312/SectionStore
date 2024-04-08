import { json } from "@remix-run/node";
import { useLoaderData} from "@remix-run/react";
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { create  } from "../controllers/SectionStore.js" ;
import CreateSectionForm from "../components/CreateSectionForm.jsx";


//loader function use for get data

export const loader = () =>{
  return json ({msg: "Success"})

}

//action function use for post data

export const action = async ({request})=> {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  //use try and catch block for error handling and print something data on try and 
  // print error on catch block

  try{
    const data = await create({title, description});
    console.log(data);
    return ({data})
  }
  catch(error){
    console.log(error);
    return json({error: "Error"});
  }
}

//export default function name with page 
//inside this function we use useLoadeData hook for get data from loader function
//and print data on console

export default function AdditionalPage() {
  const data = useLoaderData();
  console.log(data);
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
      </Layout>
    </Page>
  );
}



