import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

interface Request {
    provider: string;
    date: Date;
}

/**
 * "S" (SOLID) Sigle responsability principle : Esta classe tem uma unica resposabilidade.
 * "D" (SOLID) Dependency Invertion principle :  Esse princípio zela que uma entidade dependa apenas de abstrações, não de implementações.
 */

/**
 * DRY: Don't repeat Yourself
 */

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate != null) {
            throw Error('This appointment is already booked!');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
