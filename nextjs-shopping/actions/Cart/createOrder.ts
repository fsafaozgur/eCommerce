import axios from "axios"

export default async function createOrder(data:any, jwt:any) {

    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`

    try {
        
        const response = await axios.post(Urls, data, {
            headers:{ 
                Authorization: 'Bearer ' + jwt 
            }
        })

        return response.data


    } catch (error) {
        console.log('error', error)
        throw error
    }
}