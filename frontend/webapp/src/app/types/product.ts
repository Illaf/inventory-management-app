export interface Product {
    _id:string ;
    name: string ;
    categoryId: string ;
    description: string ;
    images: string[] | null;
    stock: number ;
    price: number ;
    supplierId: string ;
  }
  