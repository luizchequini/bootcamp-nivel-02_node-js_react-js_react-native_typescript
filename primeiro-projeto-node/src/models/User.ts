import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 *  Poderiamos colocar o relacionamento dentro deste objeto mas não é necessário.
 *  Mas ai vem a pergunta:
 *  Se sabemos que iremos usar porque não colocar ?
 *  Ai vem o KISS
 *  KISS - Keep It Simple and Stupid ( Mantenha-o simples e estúpido )
 *
 *  Mantenha o código o mais simples possível, quando precisar utilizar algo realize a inserção,
 *  quando realmente for utilizar se não há necessidade, deixe como esta.
 *
 *  Vá implementando quando necessidade surgir, mesmo saibamos que iremos utilizar futuramente.
 */

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default User;
