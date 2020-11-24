import React from 'react';
import StartButton from '../components/StartButton';

function Home() {
  return (
    <>
    <div className="ui segment">
    <p>This is a gamified prediction of Stock price game. You will be given prediction about 
      whether stock price will go up (BUY), go down (SELL) or stay same (HOLD). You can choose 
      this options using arrow keys. UP-arrow for "BUY", DOWN-arrow for "SELL" and RIGHT-arrow for "HOLD".
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type
       specimen book. It has survived not only five centuries, but also the leap into 
       electronic typesetting, remaining essentially unchanged. It was popularised in 
       the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
       and more recently with desktop publishing software like Aldus PageMaker including 
       versions of Lorem Ipsum.</p>
       </div>
    <h2>Fill the form and click GetData and then Play Button <StartButton />  </h2>
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeWyIsFp4UzqOF7OIC-e9LwzWqxmMho5eRPGub3ObV3-WULHw/viewform?embedded=true" width="700" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    </>
  );
}

export default Home;
