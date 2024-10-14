const UserModels = require("../models/UserModels");

class UserService
{

    static async create(data)
    {
        return await UserModels.create(data);
    }

    static async getAll()
    {
        return await UserModels.findAll();
    }

    static async read(id_user)
    {
        return await UserModels.findOne(
            {
                where: {
                    id_user: id_user
                }
            }
        );
    }

    static async update(id_user, data)
    {
        const [updated] = await UserModels.update(data, {
            where: { id_user: id_user }
        });

        return updated;
    }

    static async delete(id_user, data)
    {
        const [updated] = await UserModels.update(data, {
            where: { id_user: id_user }
        });

        return updated;
    }

    static async findIdUser(id_user)
    {
        return await UserModels.findOne(
            {
                where: {
                    id_user: id_user
                }
            }
        );
    }

    static async findUsername(name)
    {
        return await UserModels.findOne(
                {
                    where: {
                        name: name
                    }
                }
        );
    }

    static async findEmail(email)
    {
        return await UserModels.findOne(
            {
                where: {
                    email: email,
                    status: "1"
                }
            }
        );
    }

    static async resetPassword(id_user, password)
    {
        const [updated] = await UserModels.update(password, {
            where: { id_user: id_user }
        });

        return updated;
    }
}

module.exports = UserService;