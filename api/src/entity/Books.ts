import { Entity, Column, PrimaryColumn } from "typeorm";
import Modal from "./Modal";

@Entity("Books")
export class Books extends Modal {
  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  author: string;
}
