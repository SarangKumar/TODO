import './App.css';
import { BiAlignLeft } from 'react-icons/bi'
import { useRef, useState } from 'react';

function App() {
  const [items, setItems] = useState([])
  const inputRef = useRef();

  function handleSubmit(e){
    e.preventDefault();
    const value = inputRef.current.value;
    console.log(value);

    if(value==='') return
    setItems((prev)=>{
      return [...prev, value]
    })

    inputRef.current.value='';
  }

  function clearAll(){
    setItems([])
  }

  return (
    <div className='App-container'>
      <div className="App">
        <div className='App-box'>
          <form className="Todo-header" onSubmit={handleSubmit}>
            <BiAlignLeft size={30} color='#444' />
            <input type='search' id='search' placeholder='Add a new task' ref={inputRef}/>
          </form>
          <div className='options'>
            <div className='options-left'>
              <ul className='options-left-ul'>
                <li className='options-left-li'>All</li>
                <li className='options-left-li'>Pending</li>
                <li className='options-left-li'>Completed</li>
              </ul>
            </div>
            <div className='options-right'>
              <button className='clear' onClick={clearAll}>Clear All</button>
            </div>
          </div>
          <div className='Todo-body'>
            {items.map((item, index) => {
              return <div key={index}>{item}</div>
            })}
            {items.length===0
            ? <div className='no-task'>No item</div>
            : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
