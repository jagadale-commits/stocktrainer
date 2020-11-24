import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_STOCK } from '../util/graphql';
import useForceUpdate from 'use-force-update';

export default function StockCard(props) {
  const [state, setState] = useState(props.state);
  const forceUpdate = useForceUpdate();
  const values =  { id: state.id, decisions : state.decisions };
    const [UpdateStock, {loading}] = useMutation( UPDATE_STOCK, {
      update(
        _,
        {
          data: { updateStock: id }
        }
      ) {
        console.log(id);
      },
      variables: values
    });
    useEffect(() => {
      window.addEventListener('keydown', onKeyDown);
  
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    });

    useEffect(() => {
      let ind = state.ind;
      if(ind===101)
      {
          UpdateStock();
      }
    });
     
  function onKeyDown(e){
    e.preventDefault();
    e = e || window.event;
    let ind = state.ind;
    switch (e.keyCode) {
      case 38:
        state.decisions[ind] = 1;
         nextDay();
        break;
      case 40:
        state.decisions[ind] = -1;
         nextDay();
        break;
      case 39:
        state.decisions[ind] = 0;
        nextDay();
        break;
    }
  }
  function nextDay(){
    
    let ind = state.ind;
    let pred = state.prediction[ind];
    if(pred == 1)
    {
      state.predict = "BUY";
    }
    else if(pred == -1)
    {
      state.predict = "SHORT";
    }
    else{
      state.predict = "HOLD";
    }
    let p = state.closingPrice[ind+1];
    state.labels.push(ind+1);
    state.datasets[0].data.push(p);
    state.labels.shift();
    state.datasets[0].data.shift();
    state.ind++;
    setState(()=>state);
    forceUpdate();
  }

    return (
      <div className="Container">
        <h1 className="ui right aligned header">{state.predict }</h1>
        <Line
          data={state}
          options={{
            title:{
              display:false,
              text:'Stock Price',
              fontSize:20
            },
             legend:{
              display:false,
             }
          }}
        />
      </div>
    );
}