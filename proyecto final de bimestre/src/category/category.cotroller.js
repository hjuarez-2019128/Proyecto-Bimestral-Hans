import Category from './category.model.js'


export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const aggregate = async(req, res)=>{
    try{
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message: `The category was added successfully ${category.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'error the category was not added'})
    }
}
