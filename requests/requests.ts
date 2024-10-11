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