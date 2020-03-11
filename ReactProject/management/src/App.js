import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
{
  'idx': 1,
  'id':'hong',
  'img':'https://placeimg.com/80/80/human1',
  'name':'홍길동',
  'birth':'961222',
  'gender':'남자',
  'job':'대학생',
},
{
  'idx': 2,
  'id':'big',
  'img':'https://placeimg.com/80/80/human2',
  'name':'배민지',
  'birth':'981222',
  'gender':'여자',
  'job':'학생',
},
{
  'idx': 3,
  'id':'big',
  'img':'https://placeimg.com/80/80/human3',
  'name':'이지수',
  'birth':'971222',
  'gender':'남자',
  'job':'직장인',
}
]

class App extends Component {
    render() {
      return(
        <div>
        { customers.map(c => { //map은 key를 지정해야된다
            return(<Customer key={c.idx} id={c.id} img={c.img} name={c.name} birth={c.birth} gender={c.gender} job={c.job}/>);
          })}
        </div>
      );
    }
}

export default App;
