
import axios from "axios"


export default async function getToOrder(userId:any, jwt:any) {

    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders?filters[userId][$eq]=${userId}&[populate][OrderItemList][populate][product][populate][images][populate]`

    console.log(Urls)
    try {
        
        const response = await axios.get(Urls, {
            headers:{ 
                Authorization: 'Bearer ' + jwt 
            }
        })

        const data = response.data.data;
        const orderList = data?.map((item) => ({
            id:item.id,
            subtotal:item.subtotal,
            paymentText:item.paymentText,
            OrderItemList:item.OrderItemList,
            createdAt:item.createdAt
        }))

        return orderList;


    } catch (error) {
        console.log('getoOrdererror', error)
        throw error
    }
}

