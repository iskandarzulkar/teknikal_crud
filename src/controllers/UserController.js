const UserService   = require("../service/UserService");
const bcrypt        = require('bcryptjs');
const JWT          = require('../utils/jwt');

class UserController 
{

    static async getAll(req, res)
    {
        try {
            const user = await UserService.getAll();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res)
    {
        try {
            const users = [];
    
            const {name, email, password} = req.body;
         
            const findName = await UserService.findUsername(name);
          
            if(findName){
                return res.status(400).send('Username sudah di gunakan');
            }
                
          
            const hashedPassword = await bcrypt.hash(password, 10);
            users.push({ name, email, password: hashedPassword});
            const user = await UserService.create(users[0]);
            res.status(201).json(user);
            
        } catch (error) {
            res.status(400).json({ error: error.message });

        }

    }

    static async login(req, res)
    {
        try {
            const {name, password} = req.body;
            const checkAccount         = await UserService.findUsername(name);
            
            if(!checkAccount){
                return res.status(400).json({ message: 'Invalid username!' });
            }
            
            const isPasswordValid = await bcrypt.compare(password, checkAccount.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = JWT.generateToken({ email:checkAccount.email, name:checkAccount.name });
            res.json(
                { 
                    token,
                    user : {
                        id : checkAccount.id,
                        name : checkAccount.name,
                        email : checkAccount.email
                    }
                      
                });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async read(req, res)
    {
        try {
            const id_user   = req.params.id_user;
            const user      = await UserService.read(id_user);
       
            
            if(!user){
                return res.status(400).send('User Tidak Di temukan');
            }

            res.status(201).json(user);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req,res)
    {
        try {

            const id_user   = req.params.id_user;
            const users     = await UserService.read(id_user);
            
            if(!users){
                return res.status(400).send('User Tidak Di temukan');
            }

            const update = await UserService.update(id_user, req.body);
           
            if(update){
                const user = await UserService.read(id_user);

                res.status(201).json(user);
            }else{
                res.status(400).send("Data Gagal Di Update");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req,res)
    {
        try {
            
            const id_user   = req.params.id_user;
            const users     = await UserService.read(id_user);
            
            if(!users){
                return res.status(400).send('User Tidak Di temukan');
            }

            const data = {"status":"0"};

            const hapus = await UserService.delete(id_user, data);
     
            if(hapus){
                
                res.status(201).send("Data Berhasil Di Hapus");
            }else{
                res.status(400).send("Data Gagal Di Update");
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async resetPassword(req,res)
    {
        try {
            const user = [];
            const id_user       = req.params.id_user;
            const {password}    = req.body;

            const findUsername  = await UserService.findIdUser(id_user);
      
            if(!findUsername){
                return res.status(400).send('User Tidak Di temukan');
            }

            const hashPassword = await bcrypt.hash(password, 10);

            user.push({password: hashPassword})
            const reset  = await UserService.resetPassword(id_user, user[0]);

            if(reset)
            {
                return res.status(201).send('Password Berhasil Di Reset');
            }else{
                return res.status(400).send('Reset Password Gagal');
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = UserController;