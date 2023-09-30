const {  login ,employee} = require('../models');
// const { Employee, Manager } = require('./models');
const employeeController = {
    getAllEmployee: async (req, res) => {
        try {
            const users = await employee.allEmployee();
            return res.status(200).json({status:200 , data : users});
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    createEmployee: async (req, res) => {
        try {
            let data = req.body;
            const verifyUsers = await employee.userAlreadyExits(data);
            if (verifyUsers != null) {
                return res.status(500).json({ message: 'user already exits' });
            }
            const createUser = await employee.createUser(data);
            const loginUser = await login.createUser(data);
            let  resUser ={...createUser,...loginUser} ;
            return res.status(200).json({ data: resUser, message: "user created succesfully" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    // loginUsers: async (req, res) => {
    //     try {
    //         let loginDetail = req.body;
    //         const verifyUsers = await login.verify(loginDetail);
    //         if (verifyUsers == null) {
    //             return res.status(500).json({ message: 'user not correct' });
    //         }

    //         const payload = {
    //             userId: verifyUsers.id,
    //         };

    //         const secretKey = process.env.JWT_SECRET;
    //         const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    //         return res.status(200).json({ token: token, message: "login sucessfully" });
    //     } catch (error) {
    //         return res.status(500).json({ error });
    //     }
    // }

};

module.exports = employeeController;