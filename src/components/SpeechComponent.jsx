import { useEffect, useState } from "react";
import { postAskIA } from "../services/Api";
import styled from "styled-components";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { IoSend } from "react-icons/io5";

export default function SpeechComponent({
  recAudio,
  setRecAudio,
  question,
  setquestion,
  answer,
  setAnswer,
}) {
  function postQuestionData(question, callback) {
    if (question) {
      postAskIA(question)
        .then((res) => {
          setRecAudio(false);
          setAnswer(res.data);
          callback();
          console.log(res.data);
          setquestion("");
        })
        .catch((error) => console.log(error));
    }
  }

  useEffect(() => {
    function SpeechToText(callbeck) {
      const recognition = new window.webkitSpeechRecognition(); // Cria uma instância do reconhecimento de fala

      recognition.lang = "pt-BR"; // Define o idioma para inglês (ajuste conforme necessário)

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setquestion(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Erro no reconhecimento de fala:", event.error);
      };

      recognition.start();

      // Retorna uma função de limpeza para parar o reconhecimento de fala quando o componente desmontar
      return () => {
        recognition.stop();
        setRecAudio(false);
        callbeck();
      };
    }

    if (recAudio) {
      SpeechToText(() => console.log("pronto"));
    }
  }, [recAudio]);

  function SubmitFormHandle(event) {
    event.preventDefault();
    postQuestionData(question, () => {
      console.log("Tudo certo");
    });
  }

  return (
    <Container>
      <MicButton
        style={{ backgroundColor: recAudio ? "green" : "#ff004c" }}
        onClick={() => setRecAudio((e) => !e)}
      >
        {recAudio ? (
          <CiMicrophoneOn size={25} />
        ) : (
          <CiMicrophoneOff size={25} />
        )}
      </MicButton>
      <Form onSubmit={SubmitFormHandle}>
        <input
          placeholder="Sua pergunta aqui.."
          type="text"
          value={question}
          onChange={(e) => setquestion(e.target.value)}
        />
        <button>
          <IoSend size={20} />
        </button>
      </Form>
    </Container>
  );
}
