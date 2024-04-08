import {FormLayout, TextField} from '@shopify/polaris';
import React,{useState} from 'react';

export default function CreateSectionForm() {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
      const formData = new FormData()
      formData.append("title", title);
      formData.append("description", description);

      const res = await fetch ("/app/additional", {
        method: "POST",
        body:formData
    })
    console.log(res);
  }
    catch(error){
      console.log(error);
   
    }

  }
  return (
    <FormLayout >
      <TextField label="title" onChange={(value) => setTitle(value)} autoComplete="off" value={title}/>
      <TextField
        type="text"
        label="Description"
        onChange= {(value) => setDescription(value)}
        value={description}
        autoComplete="off"
      />
      <button onClick={handleSubmit}>Submit</button>
    </FormLayout>
  );
}