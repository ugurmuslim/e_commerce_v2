export interface IRepository {
  findOne(filter: Record<string, any>): Promise<any>;
  count(filter: Record<string, any>): Promise<number>;
  filter(filter: Record<string, any>): Promise<any[]>;
}
