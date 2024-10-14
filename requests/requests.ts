export async function getAllCategory(){
    const categoryRes = await fetch('https://fakestoreapi.com/products/categories')
    const categories = categoryRes.json()
    return categories
}

export async function getAllProducts(){
    const productsRes = await fetch('https://fakestoreapi.com/products')
    const products = productsRes.json()
    return products
}

export async function getSingleProduct(id:string){
    const productRes = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = productRes.json()
    return product
}

export async function getProductByCategory(category:string){
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    const products = res.json()
    return products
}