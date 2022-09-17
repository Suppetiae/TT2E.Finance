import Navbar from "../components/Navbar";
import Main from "../components/Main";
import reportWebVitals from "./reportWebVitals";
import store from "../hooks/redux/store";
import { Provider } from "react-redux";
import Footer from "../components/Footer";
import Head from "next/head";

function Home() {
  return (
    <Provider store={store}>
      <div>
        <Head>
          <title>TikToken Ticket NFT</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div id="particle-container">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <Navbar />
          <Main />
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default Home;
reportWebVitals();
