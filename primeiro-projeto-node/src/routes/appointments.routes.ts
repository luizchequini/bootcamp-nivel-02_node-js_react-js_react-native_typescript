import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { providerId, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            providerId,
            date: parseDate,
        });

        return response.json(appointment);
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

export default appointmentsRouter;
