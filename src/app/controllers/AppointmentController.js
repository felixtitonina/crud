
import Appointment from '../models/Appointment'
import * as Yup from 'yup'
import User from '../models/User'


class AppointmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required()
        })
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' })
        }
        const { provider_id, date } = req.body

        /**
         *  check se é um privedor  de serviso 
         */

        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true }
        })
        if (!isProvider) {
            return res.status(401).json({ error: 'You can Only create appointments with providers' })
        }

        const appointment = await Appointment.create({
            user_id: req.userId, // isso eu pego do mds
            provider_id,
            date,
        })
        return res.json(appointment)

    }
}

export default new AppointmentController