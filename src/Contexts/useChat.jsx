import { createContext, useContext, useEffect, useState } from "react";
import { postAskIA } from "../services/Api";

const ChatContext = createContext();
/*{
    question:"",
    answer: "",
    images: [{ url: "" }],
    audio: "",
    lipsync:"",
    animation:"",
  }*/

export function ChatProvider({ children }) {
  const [question, setquestion] = useState("");
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(false);
  const storageHystory = localStorage.getItem("QuestionsHistory") ;
  const [questionsHistory, setQuestionsHistory] = useState(storageHystory !== null ? JSON.parse(storageHystory): []);
  const [EnableMic, setEnableMic] = useState(false);

  const onMessagePlayed = () => {
    setAnswer();
    // setQuestionsHistory((questionsHistory) => questionsHistory.slice(1));
  };

  useEffect(() => {
    if (questionsHistory.length > 0) {
      localStorage.setItem(
        "QuestionsHistory",
        JSON.stringify(questionsHistory)
      );
    }
  }, [questionsHistory]);

  async function chat(quest) {
    setLoading(true);
    await postAskIA(quest)
      .then((res) => {
        setAnswer(res.data);
        console.log(res.data);
        setLoading(false);
        setQuestionsHistory([...questionsHistory, res.data]);
      })
      .catch(() => setLoading(false));
  }

 

  return (
    <ChatContext.Provider
      value={{
        chat,
        answer,
        setAnswer,
        loading,
        EnableMic,
        setEnableMic,
        question,
        setquestion,
        questionsHistory,
        onMessagePlayed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
