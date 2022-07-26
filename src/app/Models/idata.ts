import { IProduct } from 'src/app/Models/iproduct';
import { ICategory } from 'src/app/Models/icategory';
export interface Idata {
    Categories:ICategory[],
    Products:IProduct[]
}
