
const TodosService   = require("../service/TodosService");

class TodoController
{
    static async getAll(req, res)
    {
        try {
            console.log('teststs');
            const todos = await TodosService.getAll();
            res.status(201).json(todos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req,res)
    {
        try {
            const todos = [];
    
            const {title, description} = req.body;

            todos.push({ title, description});
            const data = await TodosService.create(todos[0]);

            console.log(data);
            res.status(201).json(data);
            
        } catch (error) {
            res.status(400).json({ error: error.message });

        }
    }

    static async update(req,res)
    {
        try {

            const id   = req.params.id;
            const todos     = await TodosService.read(id);
            
            if(!todos){
                return res.status(400).send('User Tidak Di temukan');
            }

            const update = await TodosService.update(id, req.body);
           
            if(update){
                const data = await TodosService.read(id);

                res.status(201).json(data);
            }else{
                res.status(400).send("Data Gagal Di Update");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req,res)
    {
        try {

            const id        = req.params.id;
            const todos     = await TodosService.read(id);
            
            if(!todos){
                return res.status(400).send('Data Tidak Di temukan');
            }
            
            res.status(201).json(todos);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    static async delete(req,res)
    {
        try {

            const id   = req.params.id;
            const todos     = await TodosService.read(id);
            
            if(!todos){
                return res.status(400).send('Todo Tidak Di temukan');
            }
            const hapus = await TodosService.delete(id);
     
            if(hapus){
                res.status(201).send("Data Berhasil Di Hapus");
            }else{
                res.status(400).send("Data Gagal Di Update");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TodoController;
