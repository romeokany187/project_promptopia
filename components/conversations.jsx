"use client"
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from "next/navigation";

const conversations = () => {
    const { data: session } = useSession();
    const [conversations, setConversations] = useState([]);
    const searchParms = useSearchParams();
    const userId = searchParms.get('creator');
    console.log("papa");

    useEffect(() => {
        const fetchConversations = async () => {
            const res = await fetch(`http://localhost:3000/api/chat/message/${userId}`, {
                method: 'GET',
            })
            const resData = await res.json()
            setConversations(resData)
        }
        return () => {

        };
        fetchConversations()
    }, []);
    return (
        <div>
            {
                conversations.length > 0 ?
                    conversations.map(({ conversationId, user }) => {
                        return (
                            <div key={conversationId} className='flex  items-center py-5 border-b border-b-gray-300'>
                                <div className="cursor-pointer flex items-center">
                                    <div><img src={`http://localhost:8000/${user?.image}`} width={60} height={60} className='rounded-full' /></div>
                                    <div className='ml-6'>
                                        <h3 className='text-lg font-semibold '>{user?.username}</h3>
                                        <h3 className='text-sm font-light text-gray-600'>{user?.email} </h3>
                                    </div>
                                </div>

                            </div>
                        )
                    }) : <div className="text-center text-lg font-semibold mt-14">No Conversations hun</div>
            }
        </div>
    )
}

export default conversations