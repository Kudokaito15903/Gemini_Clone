import React, { useContext, useState } from 'react';
import { assets } from '../../assets/gemini-clone-assets/assets';
import './SideBar.css';
import { Context } from '../../context/context';

const SideBar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);

    const toggleExtended = () => {
        setExtended(prev => !prev);
    };
    
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img 
                    src={assets.menu_icon} 
                    className='menu-icon' 
                    alt="Menu Icon" 
                    onClick={toggleExtended} 
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div 
                                key={index} // Đảm bảo mỗi entry có key duy nhất
                                onClick={() => loadPrompt(item)} 
                                className="recent-entry"
                            >
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item} ...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help Icon" />
                    {extended && <p>Help</p>}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon" />
                    {extended && <p>Activity</p>}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
