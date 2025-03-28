import axios from "axios"

 const deleteToCart = async(id:any, jwt:any) => {

    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts/${id}`

    console.log(Urls)
    try {
    
        const response = await axios.delete(Urls, {
            headers:{ 
                Authorization: 'Bearer ' + jwt 
            }
        })

        console.log(response)   

        return response.data


    } catch (error) {
        console.log('silme işlemi başarısız', error)
        throw error
    }
}

export default deleteToCart