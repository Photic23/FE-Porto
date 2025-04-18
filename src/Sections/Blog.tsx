import React from "react";
import BlogButton from "../components/BlogButton";
import {dataContainer} from "../Interface"


function Blog(){

    const tempData : dataContainer = {
        listDataBlog : [
            {title:"Tes title", date:"12/08/2024", content:"orem ipsum dolor sit amet consectetur adipisicing elit. Maiores molestias quam enim ducimus voluptate ex blanditiis minus rerum molestiae quis, totam repellendus sapiente quas fugit beatae cum repudiandae perspiciatis porro."},
            {title:"Tes title2", date:"12/08/2024", content:"orem ipsum dolor sit amet consectetur adipisicing elit. Maiores molestias quam enim ducimus voluptate ex blanditiis minus rerum molestiae quis, totam repellendus sapiente quas fugit beatae cum repudiandae perspiciatis porro."},
        ]
    }

    return(
        <>
            <div className="bg-transparent h-svh w-full px-8 py-8">
                <div className="flex h-full w-full items-center justify-center rounded border-2 border-black bg-[#B5DFCA] overflow-auto">
                    <BlogButton></BlogButton>
                </div>
            </div>
        </>
    );
};

export default Blog;