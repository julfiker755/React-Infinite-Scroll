import React, { useEffect, useRef, useState } from 'react';


const productsPerPage=10
const ProductList = () => {
    const [products,setproducts]=useState([])
    const [page,setpage]=useState(0)
    const [hasMore,sethasMore]=useState(true)
    const loaderef=useRef(null)

    useEffect(()=>{
        async function fetchProducts(){
            const response = await (await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${page * productsPerPage}`)).json()
            

            if(response.products.length === 0){
                sethasMore(false)
            }else{
                setproducts(prevproduct=>[...prevproduct,...response.products])
                setpage(prepage=>prepage+1)
            }

        }

        // onIntersection
        const onIntersection = (items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchProducts();
            }
        };

        const observer = new IntersectionObserver(onIntersection);

        if (observer && loaderef.current) {
            observer.observe(loaderef.current);
        }

        // cleanup
        return () => {
            if (observer) observer.disconnect();
        };
    },[])


  
    return (
        <div>

           <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
           {products?.map((d,i)=><div key={i} className='border p-4'>
                <img className='w-full h-[150px]' src={d?.thumbnail} alt="" />
                <p>{d?.description}</p>
                </div>)}
           </div>
            
            {hasMore && <div ref={loaderef}>Loading more products</div>}
        </div>
    );
};

export default ProductList;
