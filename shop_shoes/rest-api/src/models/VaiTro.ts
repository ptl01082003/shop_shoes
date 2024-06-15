
// models/User.ts
import { databaseService } from '../config/ConnectDB';
export class VaiTro {
  public Ma :string;
  public Ten: string;


  constructor(Ma: string, Ten: string) {
    this.Ma = Ma;
    this.Ten = Ten;
  }

  public static async findAll(): Promise<VaiTro[]> {
    const sql = 'SELECT * FROM vaitro';
    const rows = await databaseService.query(sql);
    return rows.map((row: any) => new VaiTro(row.Ma, row.Ten));
  }

}
