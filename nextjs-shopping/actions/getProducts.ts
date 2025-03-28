import { Product } from "@/constants/type";
import axios from "axios";


// export const getProducts = async(url:string):Promise<Product[]> => {

//     const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL + url}`


//     const res = await axios.get(Urls);
//     /*Dönen JSON formatta en başta "data" yazıyor, bunu tip tanımlarken modele dahil edebilirdik ama etmediğimiz için burada .data diyerek içerisndeki bizim modelimize uygunveriyi çekiyoruz*/
//     const data = res.data.data;
//     return data;

// }





export default async function getProducts(url:string) {
    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL + url}`
    const request = await fetch(Urls)
    const data = await request.json();
    return data.data;
}