import { Category } from "@/constants/type";
import axios from "axios";



// const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories?populate=*`

// export const getCategories = async():Promise<Category[]> => {

//     const res = await axios.get(Urls);
//     /*Dönen JSON formatta en başta "data" yazıyor, bunu tip tanımlarken modele dahil edebilirdik ama etmediğimiz için burada .data diyerek içerisndeki bizim modelimize uygunveriyi çekiyoruz*/
//     const data = res.data.data;
//     return data;


// }



export default async function getCategories() {
    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories?populate=*`
    const request = await fetch(Urls)
    const data = await request.json();
    return data.data;
}