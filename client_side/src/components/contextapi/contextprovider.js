import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

const Chatprovider = ({ children }) => {
    const [user, setuser] = useState();

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo);

        if (!userInfo) {
            history.push('/');
        }
    }, [history]);

    return (
        <ChatContext.Provider value={{ user, setuser }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatState = () => {
    return useContext(ChatContext);
};

export default Chatprovider;
