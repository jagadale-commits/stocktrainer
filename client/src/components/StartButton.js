import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_STOCK } from '../util/graphql';

const tick = [	"AAPL",	"MSFT",	"AMZN",	"FB",	"GOOGL",	"TSLA",	"GOOG",	"NVDA",	"CMCSA",
  "PYPL",	"ADBE",	"NFLX",	"PEP",	"INTC",	"CSCO",	"COST",	"QCOM",	"TMUS",	"AVGO",	"TXN",	
  "CHTR",	"AMGN",	"SBUX",	"AMD",	"INTU",	"ISRG",	"BKNG",	"MDLZ",	"JD",	"GILD",	"FISV",
 "ZM",	"ADP",	"AMAT",	"CSX", "MU", "MELI",	"LRCX",	"ATVI",	"ADSK",	"VRTX",	"REGN",	"ADI",	
 "MNST",	"ILMN",	"LULU",	"NXPI",	"KDP",	"CTSH",	"EXC",	"WDAY",	"DOCU",	"PDD",	"MAR",	"ROST",	"KLAC"];
const rn = Math.floor(Math.random() * 52);

const instate ={
 ticker: tick[rn],
 link: "/"
}
function StartButton() {
  var state = instate;
  const { user } = useContext(AuthContext);
  const [CreateStock, { loading }] = useMutation(CREATE_STOCK, {
    update(
      _,
      {
        data: { createStock: d }
      }
    ) {
      state.link = `/stocks/${d.id}`;
    },
    variables: { ticker: state.ticker }
  });

  function Checkl(){
    if(user)
    CreateStock();
    else
    alert("PLEASE LOGIN FIRST");
  }
  return (
    <>
    <Button onClick={Checkl} primary >
      GetData
    </Button>
    <Button as={Link} to={`${state.link}`} primary >
      PLAY
    </Button>
    </>
  );
  

}

export default StartButton;
