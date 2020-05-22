import User from '../models/User'
import File from '../models/File'

class ProviderController {
    async index(req, res) {
        const providers = await User.findAll({  
            where: { provider: true },
            attributes: ['id', 'name', 'email', 'avatar_id'], // o que quero receber
            include:  [{ 
                model: File, // pega dados do relacionamento
                as: 'avatar', // apelido
                attributes: ['name', 'path', 'url']
            }]
        })
        return res.json(providers)
    }

}

export default new ProviderController()