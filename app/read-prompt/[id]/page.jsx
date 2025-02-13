"use client"

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import PromptCard from "@components/PromptCard";
import { useSession } from "next-auth/react";


const ReadPrompt = () => {
  const [post, setpost] = useState({});
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {

    const fecthPost = async () => {
      const response = await fetch(`/api/prompt/${postId}`, {
        method: 'GET'
      });
      const data = await response.json();
      setpost(data)
    }
    if (postId) fecthPost();
  }, []);

  const handleContactClick = () => {
    console.log(post);

    router.push(`/chat/${post?.creator?.username}?creator=${post?.creator?._id}&conversationId=${"new"}`);
  };
  return (
    <div className="flex flex-col lg:px-8 md:px-6 sm:px-3 p-0 py-4 lg:w-[75%] md:w-[85%] sm:w-[90%] w-[100%]  ">
      <div className='flex justify-between items-start lg:gap-[6rem]  '>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        >
          <Image
            src={post.creator?.image}
            alt='user_image'
            width={55}
            height={55}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi lg:text-2xl md:text-xl text-[1rem] font-semibold text-gray-900'>
              {post.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator?.email}
            </p>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className=" lg:text-sm text-xs blue_gradient mt-2 lg:font-extrabold font-bold text-[1rem] ">{post.tag} </div>
        </div>
      </div>
      <div className="my-4 font-satoshi lg:text-[1.3rem] md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-gray-700  px-4  "> {post.prompt} </div>
      <div className="lg:hidden px-4"><div className=" lg:text-sm  blue_gradient mt-2  font-bold text-[1rem] ">{post.tag} </div></div>
      {session?.user?.id === post.creator?._id ? (
        <div className=""></div>
      ) : <div className="self-end px-10 py-3 mt-5 text-[1rem] bg-primary-orange rounded-full text-white font-bold cursor-pointer" onClick={handleContactClick}>Contact</div>
      }

    </div>
  )
}

export default ReadPrompt