import { getAllCategory } from "@/requests/requests";

const Category = async() => {
    const categories: string[] = await getAllCategory();
    return (
        <div className="pt-16 pb-12">
            <h1 className="text-center font-bold text-2xl">
                Shop by Category
            </h1>
            <div  className="grid grid-cols-2  lg:grid-cols-4 gap-4 mx-auto mt-12 w-4/5">
                {categories.map((category)=>{
                    return( <div 
                    key={category}  
                    className="p-6 rounded-lg text-center bg-gray-200 shadow-md hover:scale-110 transition-all-duration-300 cursor-pointer "  >
                        <h1 className="capitalize font-bold text-sm sm:text-base md:text-lg">
                            {category}
                        </h1>
                    </div>)
                   
                })}

            </div>
        </div>
    );
};

export default Category;