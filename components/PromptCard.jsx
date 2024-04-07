"use client"
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  }

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt='user_Image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className="flex flex-col">
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username} </h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email} </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>


      <div className='cursor-pointer'>
        <p className='my-4 font-satoshi text-sm text-gray-700 text-ellipsis text-nowrap overflow-hidden'
          onClick={() => document.getElementById('my_modal_3').showModal()}>{post.prompt} </p>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="prompt_card border-none">
            <div className="flex justify-between items-start gap-5">
              <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
                <Image
                  src={post.creator.image}
                  alt='user_Image'
                  width={40}
                  height={40}
                  className='rounded-full object-contain'
                />
                <div className="flex flex-col">
                  <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username} </h3>
                  <p className='font-inter text-sm text-gray-500'>{post.creator.email} </p>
                </div>
              </div>
              
            </div>
            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt} </p>
            <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick(post.tag)}> # {post.tag} </p>
          </div>
        </div>
      </dialog>

      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick(post.tag)}> # {post.tag} </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard