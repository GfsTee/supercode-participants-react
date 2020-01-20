import React, { Component } from 'react';
import Participant from './Components/Participant'
import './App.css';
import uuid from 'react-uuid'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      participants: [
        { name: 'Adhm', participating: true },
        { name: 'Ahmad', participating: true },
        { name: 'Ariane', participating: true },
        { name: 'Edward', participating: true },
        { name: 'Elaine', participating: true },
        { name: 'Florian', participating: true },
        { name: 'Hakan', participating: true },
        { name: 'Hasan', participating: true },
        { name: 'Houman', participating: true },
        { name: 'Jana', participating: true },
        { name: 'Jascha', participating: true },
        { name: 'Medovyi', participating: true },
        { name: 'Mohammad Alzibak', participating: true },
        { name: 'Mohammad Olfatee', participating: true },
        { name: 'Soroush', participating: true },
      ],
      radio: 2,
      actualParticipants: [],
      count: 0
     }
     
  }
  componentDidMount = () => {
    this.setState({ count: this.state.participants.length });
   }
  handleChecked = (e) => {
    const changeStatus = this.state.participants.map(element => {
      if (element.name === e) {
        element.participating = !element.participating
      } 
      return element
    })
    this.setState({ participants: changeStatus });
    this.truecount(this.state.participants)
  }
  handleRadio = (e) => {
    this.setState({ radio: Number(e.target.value) }); 
  }
  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }
  truecount = () => {
    let count = 0;
    this.state.participants.map(element => {
      if (element.participating === true) {
        count = count + 1
      } 
    })
    this.setState({ count });
  }
  handleSubmit = () => {
    let temp = []
    temp = this.state.participants.map(part => {
      if (part.participating) {
        return part.name;
      }
    })
    let temp2 = temp.filter(part => {
      return typeof part ==='string';
    })
    this.shuffle(temp2)
    this.setState({ actualParticipants: temp2 });
    let parGroup = (Math.ceil(temp2.length/this.state.radio))
    let result = document.getElementById('result');
    result.innerHTML = "";
    for (let j = 1; j<=this.state.radio; j++) {
        for (let k = 1; k<=parGroup; k++) {
            result.innerHTML += `<p><strong>Gruppe ${j}:</strong> ${temp2.pop()}</p>`;
            if (temp2.length === 0) {
              break
            }
        }
    }
    
  }
  render() { 
    
    const allParti = this.state.participants.map(e =>
      <Participant 
      key={uuid()}
      name={e.name} 
      handleChecked={this.handleChecked}
      participating={e.participating}/>)
    return ( 
      <main>
        <h1>Willkommen bei super(<span>code</span>):</h1>
        <h6>Now with React</h6>
        <h4>Teilnehmeranzahl: {this.state.count}</h4>
        <section>
          <div>
            {allParti}
            <select className="select-css" name="groups" id="groups" onChange={this.handleRadio}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button onClick={this.handleSubmit}>Abschicken</button>
          </div>
          <div id="result"></div>
        </section>
      </main>
     );
  }
}



export default App;

