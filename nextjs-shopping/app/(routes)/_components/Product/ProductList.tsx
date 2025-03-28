
'use server'
import getProducts from '@/actions/getProducts';
import ProductItem from './ProductItem';    



export default async function ProductList() {

    const products = await getProducts('/products?sort[0]=id:desc&filters[isTop]=true&pagination[start]=0&pagination[limit]=8&populate=*');

// const ProductList = () => {

//     const [products, setProducts] = useState([])
//     const [loading, setLoading] = useState(true)

//     useEffect( () => {

//         console.log('hataaaaaaaaaaa1111111')

//         const fetchProducts = async() => {


//             try {
//                 const products = await getProducts('/products?sort[0]=id:desc&filters[isTop]=true&pagination[start]=0&pagination[limit]=8&populate=*');
//                 setProducts(products)
//                 console.log('hataaaaaaaaaaaaaa22222')
//             } catch (error) {
//                 console.error('error', error)
//                 console.log('hataaaaaaaaaaaaaa3333')
//             }finally{
//                 setLoading(false)
//             }

//         }

//         fetchProducts()

//         console.log(products)

//     },[])


  return (
    <>
 

        <div className='sm:m-8 md:m-12 w-[95%] items-center'>
            <h2 className='textone font-semibold text-2xl lg:text-3xl'>
                Shop by Products
            </h2>
        
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 m-8'>
            {products && products?.map( (product) => (
              <ProductItem
              product={product}
              key={product?.id}
              />           
            ))}
            </div>
        </div>


    </>
  )
}




