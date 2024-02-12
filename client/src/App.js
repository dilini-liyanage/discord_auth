
import './App.css';

function App() {
  const signInWithDiscord = () => {
    const CLIENT_ID = "1206439683412992082"; 
    const REDIRECT_URI = encodeURIComponent(
      "http://localhost:1500/api/auth/discord/redirect"
    );
    const RESPONSE_TYPE = "code";
    const SCOPE = encodeURIComponent("identify email"); 
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  };

  return (
    <div className="App">
      <button onClick={signInWithDiscord}>Sign In with Discord</button>
    </div>
  );
}

export default App;