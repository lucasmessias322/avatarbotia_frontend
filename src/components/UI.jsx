import { useEffect } from "react";
import styled from "styled-components";
import { useChat } from "../Contexts/useChat";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { TbReload } from "react-icons/tb";

export default function UI({ hidden }) {
  const {
    chat,
    answer,
    loading,
    EnableMic,
    setEnableMic,
    question,
    setquestion,
    setAnswer,
    questionsHistory,
  } = useChat();

  function sandQuestion(question) {
    console.log(question);
    if (!loading && question) {
      chat(question);
      setquestion("");
    }
  }

  function HandleFormSubmit(event) {
    event.preventDefault();
    sandQuestion(question);
  }

  if (hidden) {
    return null;
  }

  useEffect(() => {
    function SpeechToText(callbeck) {
      const recognition = new window.webkitSpeechRecognition(); // Cria uma instância do reconhecimento de fala

      recognition.lang = "pt-BR"; // Define o idioma para inglês (ajuste conforme necessário)

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setquestion(transcript);

        setEnableMic(false);
        sandQuestion(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Erro no reconhecimento de fala:", event.error);
      };

      recognition.start();

      // Retorna uma função de limpeza para parar o reconhecimento de fala quando o componente desmontar
      return () => {
        recognition.stop();

        callbeck();
      };
    }

    if (EnableMic) {
      SpeechToText(() => console.log("pronto"));
    }
  }, [EnableMic]);

  function lastQuestion() {
    console.log(questionsHistory.length - 1);
    setAnswer(questionsHistory[questionsHistory.length - 1]);
  }

  return (
    <Container>
      <ImageDisplay src={answer?.images[0]?.url}></ImageDisplay>

      <FormWrapper>
        <MicButton
          enablemic={EnableMic}
          onClick={() => setEnableMic((e) => !e)}
        >
          {EnableMic ? (
            <CiMicrophoneOn size={25} />
          ) : (
            <CiMicrophoneOff size={25} />
          )}
        </MicButton>
        <Form onSubmit={HandleFormSubmit}>
          <input
            required
            placeholder="Sua pergunta aqui.."
            type="text"
            value={question}
            onChange={(e) => setquestion(e.target.value)}
          />
          <FormButton disabled={loading || !question || EnableMic}>
            <IoSend />
          </FormButton>
        </Form>

        <FormButton disabled={loading} onClick={() => lastQuestion()}>
          <TbReload />
        </FormButton>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  z-index: 99999;
`;

const ImageDisplay = styled.img`
  z-index: 99999;
  max-width: 550px;
  max-height: 550px;

  border: 4px solid #ff004c;
  border-radius: 2px;
  margin: 10px;
  background-color: #fff;
  object-fit: contain;

  display: ${(props) => (props.src ? "block" : "none")};
  transition: all 200ms, opacity 500ms;
`;

const FormWrapper = styled.div`
  padding: 10px;
  margin: 0 auto;
  width: 100%;

  font-size: 20px;
  align-items: center;

  z-index: 99999;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  bottom: 0;
`;
const MicButton = styled.button`
  border: none;
  padding: 5px;
  color: white;
  background-color: ${(props) => (props.enablemic ? "#009908" : "#ff004c")};
  border-radius: 10px;
  margin: 2px;
  outline: none;
  &:hover {
    transform: scale(1.1);
  }
`;

const Form = styled.form`
  width: 90%;
  max-width: 400px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  input {
    font-size: 16px;
    width: 100%;
    border: none;
    padding: 10px 5px;
    border-radius: 5px;
    outline: none;
    margin-left: 5px;
  }
`;

const FormButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 20px;
  outline: none;
  border: none;
  color: white;
  margin-left: 4px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => (props.disabled ? "#ff004c53" : "#ff004c")};

  &:hover {
    transform: scale(1.1);
  }
`;
