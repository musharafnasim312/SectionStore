import prisma from '../db.server.js'; 
export const create = async (query) => { 
    try{

        let id = query["id"] || " ";

        if(id ){
            delete query["id"];
        }
        const res = await prisma.sectionStore.upsert({
                where: { id: id},
                update: query,
                create: query,
                select: {id: true}
            })
        console.log(res) 
    }
    catch(error){
        console.log(error)  
        return error; 
    }
}
export const getSections = async () => {

    try{
        const res = await prisma.sectionStore.findMany()
        return res;
    }
    catch(error){
        console.log(error)  
        return error; 
    }
}

export const deleteSection = async(id)=>{
    try{
        const res =await prisma.sectionStore.delete({
            where: { id  }
        })

        return res;

    }

    catch(error){
        console.log("error")
        return error; 

    }
}
