import React from 'react'

const Message = ({ receiver, messages }) => {
    return (
        <section>
            <div className="">
                {receiver.image}
                {receiver.username}
                {receiver.email}
            </div>
            <div className="">
                {
                    messages?.messages?.length > 0 ?
                        messages?.messages?.map(({ message, user: { id } = {} }) => {
                            return (
                                <>
                                    <div key={user?.id} className={` max-w-[40%]  rounded-b-xl p-4 mb-6 ${id === user?.
                                        id ? 'bg-primary text-white  rounded-tl-xl ml-auto' : 'bg-secondary rounded-tr-xl'}  `}>
                                        {message}
                                    </div>
                                    <div ref={messageRef}></div>
                                </>
                            )
                        }):<div className="text-center text-lg font-semibold mt-14">No Messages </div>
            }
            </div>
        </section>
    )
}

export default Message