import prisma from '../db.server.js'; 
export const create = async (query) => { 
    try{
        // let id = query.id? query.id : undefined; 
        const res = await prisma.SectionStore.upsert({
                where: { id: query["id"] || " "},
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
        const res = await prisma.SectionStore.findMany()
        return res;
    }
    catch(error){
        console.log(error)  
        return error; 
    }
}
