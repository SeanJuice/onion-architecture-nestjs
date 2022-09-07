import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Department extends Model {
  @Column
  Dep_ID: string;

  @Column
  Dep_Name: number;

}