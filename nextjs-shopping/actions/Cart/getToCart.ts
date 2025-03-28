
import axios from "axios"


export default async function getToCart(userId:any, jwt:any) {

    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate]`

    console.log(Urls)
    try {
        
        const response = await axios.get(Urls, {
            headers:{ 
                Authorization: 'Bearer ' + jwt 
            }
        })

        const data = response.data.data;
        const cartItemList = data.map((item) => ({
            name: item?.products[0]?.name,
            quantity: item?.quantity,
            amount: item?.amount,
            id:item?.id,
            color: item?.color,
            size: item?.size,
            product: item?.products[0]?.id,
            images: item?.products[0]?.images[0]?.url
        }))

        console.log(cartItemList)
        return cartItemList;


    } catch (error) {
        console.log('gettocard error', error)
        throw error
    }
}

