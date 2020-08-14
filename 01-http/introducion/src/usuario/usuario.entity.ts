import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Index([
    'nombre', // son el nombre de la variables de esa clase, no los nobmres de las columnas que se especificaron dentro de @Column
    'apellido',
    'cedula',
    'fechaNacimiento'
])

//@Index(
//    ['nombre','apellido','cedula'], //indice compuesto, si un registro tiene la misma combinacion de nombre apellido y cedula no se guardará ya que debe ser único
//    {unique: true}
//    )

    // @ts-ignore
@Entity('db_usuario') // nombre de la tabla
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador'
    })
    id: number

    @Column({
        name: 'nombre',
        type: "varchar",
        nullable: true,
        length: '60',
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: "varchar",
        nullable: true,
        length: '60',
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: "varchar",
        nullable: false,
        unique: true,
        length: '18',
    })
    cedula: string

    @Column({
        name: 'sueldo',
        type: "decimal",
        precision: 10, // enteros
        scale: 4, // decimales
        nullable: true,
    })
    sueldo?: number

    @Column({
        name: 'fecha_nacimiento',
        type: "date",
        nullable: true,
    })
    fechaNacimiento?: string

    @Column({
        name: 'fecha_hora_nacimiento',
        type: "datetime",
        nullable: true,
    })
    fechaHoraNacimiento?: string

}