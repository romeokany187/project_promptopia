"use client"

import { useSession } from "next-auth/react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import conversations from "@components/conversations"

const ContactUser = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const receiverId = searchParams.get("creator")
  const conversationId = searchParams.get("conversationId")
  const { data: session } = useSession();
  const senderId = session?.user?.id;
  const [message, setmessage] = useState('');
  const [messages, setmessages] = useState({});
  console.log(session?.user._id);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/chat/message", {
        method: 'POST',
        body: JSON.stringify({
          conversationId: conversationId,
          senderId: senderId,
          receiverId: receiverId,
          message: message
        }
        )
      })
      if (response.ok) {
        setmessage("")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="">
        <conversations/>
      </div>
      <form action="" onSubmit={sendMessage}>
        <input type="text" name="" id="" value={message} onChange={(e) => setmessage(e.target.value)} />
        <button type="submit">send</button>
      </form>
      {messages?.messages?.map((message) => {
        <div className="" key={message._id}>
          {message.message}
        </div>
      })}
    </div>
  )
}

export default ContactUser