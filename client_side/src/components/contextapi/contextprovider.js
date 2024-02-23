import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

const Chatprovider = ({ children }) => {
    const [user, setuser] = useState([]);
    const [SelectedChat, setSelectedChat] = useState([]);
    const [Chat , setChat] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(userInfo);
        setuser(userInfo);

        if (!userInfo) {
            history.push('/');
        }
    }, [history]);

    return (
        <ChatContext.Provider value={{ user, setuser , SelectedChat , setSelectedChat , Chat , setChat}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatState = () => {
    return useContext(ChatContext);
};

export default Chatprovider;
