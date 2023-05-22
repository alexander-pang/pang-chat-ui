import React from "react";

const Sidebar = () => {
    return (
        <div className="flex flex-col md:ml-2">
            <div className="flex justify-center mt-8 mb-7 md:justify-start">
                <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt=""
              className="w-7 rounded-full mr-2"
                />
                <span className="invisible md:visible w-0 md:w-auto font-medium">Chats</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
                <div className="flex mb-3">
                    <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                        alt=""
                        className="w-8 h-8 rounded-full mr-1.5"
                    />

                    <span className="text-sm leading-8 invisible md:visible w-0 md:w-auto">Nickname 1</span>
                </div>
                <div className="flex mb-3">
                    <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                        alt=""
                        className="w-8 h-8 rounded-full mr-1.5"
                    />

                    <span className="text-sm leading-8 invisible md:visible w-0 md:w-auto">Nickname 2</span>
                </div>
            </div>
        </div>
    )
    
};

export default Sidebar;