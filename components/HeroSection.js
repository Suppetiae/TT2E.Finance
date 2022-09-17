import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../hooks/redux/blockchain/blockchainActions";
import { fetchData } from "../hooks/redux/data/dataActions";
import Image from "next/image";
import Ticket from "../assets/ticket.png";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

function HeroSection() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congratulations, the TTicket is yours! Visit our official channels to find out the winner!`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <div>
      <div className="login-box">
        {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
          <>
            <h2 className="title">
              The sale has ended. You can still find {CONFIG.NFT_NAME} on{" "}
              {CONFIG.MARKETPLACE}
            </h2>
          </>
        ) : (
          <>
            <h2 className="title">Sale is Live</h2>
            <div class="product-banner">
              <Image src={Ticket} className="image-wrapper" />
            </div>
            <form>
              <div className="price">
                <div className="priceleft">
                  <p>Price :</p>
                  <p>
                    {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
                  </p>
                </div>
                <div className="priceright">
                  <p>Remaining :</p>
                  <div>
                    {data.totalSupply} / {CONFIG.MAX_SUPPLY}
                  </div>
                </div>
              </div>
              <div className="quantity">
                <div className="qleft">Quantity:</div>
                <div className="qright">
                  <div className="inputgrup">
                    <button
                      className="control_next"
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        decrementMintAmount();
                      }}>
                      -
                    </button>
                    <p className="control_input"> {mintAmount}</p>
                    <button
                      className="control_prev"
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementMintAmount();
                      }}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p className="p-network">
                Connect to the {CONFIG.NETWORK.NAME} network
              </p>
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <div className="mintbutton">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Connect
                  </a>

                  {blockchain.errorMsg !== "" ? (
                    <>
                      <p> {blockchain.errorMsg}</p>
                    </>
                  ) : null}
                </div>
              ) : (
                <>
                  <p className="description">{feedback}</p>

                  <a
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs();
                      getData();
                    }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    {claimingNft ? "BUSY" : "BUY"}
                  </a>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
