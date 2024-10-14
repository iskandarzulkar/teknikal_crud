 const TodosModels   = require("../models/TodosModels");

class TodosService
{
    static async create(data)
    {
        return await TodosModels.create(data);
    }

    static async getAll()
    {
        return await TodosModels.findAll();
    }

    static async read(id_user)
    {
        return await TodosModels.findOne(
            {
                where: {
                    id: id,
                    status: "1"
                }
            }
        );
    }

    static async update(id, data)
    {
        const [updated] = await TodosModels.update(data, {
            where: { id: id }
        });

        return updated;
    }

    static async delete(id)
    {
        return await TodosModels.destroy({
            where: { id: id }
        });
    }

    static async findIdUser(id)
    {
        return await TodosModels.findOne(
            {
                where: {
                    id: id,
                    status: "1"
                }
            }
        );
    }

    static async findTitle(title)
    {
        return await TodosModels.findOne(
            {
                where: {
                    title: title,
                    status: "1"
                }
            }
        );
    }
}

module.exports = TodosService;