

export class Anh {
 public ID: BigInteger;
 public SanPham: string;
 public Ten: string;
 public ViTriAnh: number;



constructor(
    ID: BigInteger, 
    SanPham: string,
    Ten: string, 
    ViTriAnh: number,

) {
  this.ID = ID;
  this.SanPham = SanPham;
  this.Ten = Ten;
  this.ViTriAnh = ViTriAnh;
 

}
}
