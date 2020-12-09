import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';

/**
 *  Relacionamentos
 *
 *  Um para Um          (OneToOne)
 *  Um para muitos      (OneToMany)
 *  Muitos para Muitos  (ManyToMany)
 */

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string; // Passar para uuid

    @Column()
    providerId: string; // Passar para int

    @ManyToOne(() => User)
    @JoinColumn({ name: 'providerId' })
    provider: User;

    @Column('time with time zone')
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Appointment;
