import React, { useState, useEffect } from 'react';

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const startRecording = async () => {
    try {
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);

      const mediaRecorder = new MediaRecorder(stream);
      setRecorder(mediaRecorder);

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recorder && recorder.state === 'recording') {
      recorder.stop();
      mediaStream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const downloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'video.webm';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(videoUrl);
    }
  };

  useEffect(() => {
    if (!isRecording) {
      downloadVideo();
    }
  }, [isRecording]);

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Parar gravação' : 'Iniciar gravação'}
      </button>
      {videoUrl && (
        <p>
          <a href={videoUrl} download="video.webm">
            Clique aqui para baixar o vídeo
          </a>
        </p>
      )}
    </div>
  );
};

export default VideoRecorder;
