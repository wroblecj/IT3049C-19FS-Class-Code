import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
constructor(props) {
         super(props);
         this.state ={
           playerValue: '',
           opponentValue: '',
           history: [],
           win: 'no results'
         }

         
         this.changeValue = this.changeValue.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }

    changeValue = event => {
      this.setState({
          ['playerValue']: event.target.value
      });

    };

    pickOpponentValue()
    {
      var num = Math.ceil(Math.random()* 3);
      switch(num){
        case 3: 
          return 'scissors';
        case 2:
          return 'paper';
        default:
          return 'rock';
      }
    }

    determineWin()
    {
      this.setState({
        ['opponentValue']: this.pickOpponentValue()
      });
      if(this.state.playerValue.toString()==='rock'  && this.state.opponentValue.toString()==='scissors')
        return 'player';
      else if(this.state.playerValue.toString()==='scissors' && this.state.opponentValue.toString()==='paper')
        return 'player';
      else if(this.state.playerValue.toString()==='paper' && this.state.opponentValue.toString()==='rock')
        return 'player';
      else if(this.state.opponentValue.toString()==='rock' && this.state.playerValue.toString()==='scissors')
        return 'opponent';
      else if(this.state.opponentValue.toString()==='scissors' && this.state.playerValue.toString()==='paper')
        return 'opponent';
      else if(this.state.opponentValue.toString()==='paper' && this.state.playerValue.toString()==='rock')
        return 'opponent';
      else return 'draw';
    }


     onSubmit = event => {
        event.preventDefault();
      var win =this.determineWin();
      let history = this.state.history;
      history.push({
        victor: win,
        player: this.state.playerValue,
        opponent:this.state.opponentValue,
      })
      this.setState(
        {
          ['history']: history,
          ['win']: win
        }
        
      )

   }
  render(){
  return (
    <div className="App">
      <header className="App-header">
      <h1>Casey's Rock Paper Scissors Game</h1>
      <p>Directions: Select a value and hit submit.
      <br/>
      Rock beats Scissors
      <br/>
      Scissors beats Paper
      <br/>
      Paper beats Rock
      </p>
        <select value={this.state.playerValue} onChange={event => this.changeValue(event)}>
          <option>choose...</option>
          <option value="rock">rock</option>
          <option value="paper">paper</option>
          <option value="scissors">scissors</option>
        </select>
        <input type="submit" value="Submit" onClick={(event)=> this.onSubmit(event)} />
      <p>
        You choose: {this.state.playerValue}
        <br/>
        The opponent choose: {this.state.opponentValue}
        <br/>
        The winner is: {this.state.win}
      </p>
      </header>
      <ul>
      {this.state.history.map(item => {
          return <li>{item['victor'].toString()}, player: {item['player'].toString()}, opponent: {item['opponent'].toString()}</li>;
        })}
      </ul>
    </div>
  );
  };
}

export default App;
