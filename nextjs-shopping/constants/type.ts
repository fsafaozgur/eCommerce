
export type Category = {
    id:number,
    attributes: {
        name:string,
        slug:string,
        image:{
            url:string
        }
    }
} 



export type Slider = {
    id:number,
    attributes: {
        link:string,
        media:{
            url:string
        }
    }
} 

export type Size = {
    id:number,
    attributes: {
        name:string
    }
    
} 


export type Color = {
    id:number,
    attributes: {
        name:string
    }
} 

export type ProductImage = {
    id:number,
    data: {
        attributes: {
            url:string
        }
    }
    
} 


export type ImageProduct = {
    images:{
        url:string
    }
}
    



export type Product = {
    id:number,
    attributes:{
        name:string,
        description:string,
        slug:string,
        mrp:number,
        isTop:boolean,
        recent:boolean,
        sellingPrice:number,
        images:ProductImage[],
        category:Category,
        colors:Color[],
        sizes:Size[]
    }
}