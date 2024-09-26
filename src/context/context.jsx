import { createContext, useState } from "react";
import runChat from "../config/gemini";
export const Context = createContext();

const ContextProvider= (props) => {
    const [input,setInput]= useState("");
    const [recentPrompt, setRecentPrompt]= useState("");  //  (Cac yêu cầu cua nguoi dung )
    const [loading, setLoading]= useState(false);
    const [prevPrompts, setPrevPrompts]= useState([]); // History 
    const [showResult, setShowResult]= useState(false);     // Hiển thị trang chủ
    const [resultData, setResultDaTa]= useState(""); //Lưu kết quả API 

    const delayPara =  (index, nextWord) => {
        setTimeout (function (){
            setResultDaTa(prev => prev +nextWord); 
        },75*index)
   ;
    }

    const onSent = async(prompt) => {
        setResultDaTa("");  // Xóa kết quả trước đó
        setLoading(true);  // Hiển thị trạng thái đang tải
        setShowResult(true);  // Hiển thị phần kết quả
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            response = ""; // Đảm bảo response có giá trị nếu prompt không tồn tại
        }

    
        // Chia phản hồi theo dấu "**"
        let responseArray = responses.split("**");
        let newResponse = "";  // Khởi tạo chuỗi mới để lưu kết quả đã xử lý
    
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                // Thêm phần không phải highlight
                newResponse += responseArray[i];
            } else {
                // Thêm phần được bôi đậm (highlight)
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        // Thay dấu "*" bằng thẻ HTML xuống dòng
        let newResponse2 = newResponse.split("*").join("<br>");
        let newResponseArray = newResponse2.split(" ");
        for ( let i=0; i<newResponseArray.length;i++) {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+ " ")
        }      
        
        // Ẩn trạng thái đang tải
        setLoading(false);
    
        // Xóa input
        setInput("");
    };
    

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        loading,
        prevPrompts,
        setPrevPrompts,
        showResult,
        resultData,
        onSent,
    };
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider