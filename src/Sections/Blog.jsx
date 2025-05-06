import React from "react";
import BlogButton from "../components/BlogButton";


function Blog(){

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