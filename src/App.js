import React, { Component } from 'react';
import './App.css';

// const Button = ({onClick}) => <button onClick={onClick}>click me</button>

// class App extends Component {
//   state = {
//     count: 0
//   }

//   incHandler = () => {
//     this.setState(prevState => ({
//       count: prevState.count + 1
//     }))
//   }

//   render() {
//     return (
//       <div id='main'>
//         <input /> 
//         <Button onClick={this.incHandler} /><br />
//         {/* {this.state.count} */}


//       </div>
//     );
//   }
// }

class Record extends React.PureComponent {
  render () {
    const {value, onDelete, onMoveDown, onMoveUp, hasDownButton, hasUpButton} = this.props
    return <div>                      
  	<div className="record">
			<div className="recordtext">
        {value}
      </div>
		  <button onClick={onDelete}>x</button>
		  {hasUpButton && <button onClick={onMoveUp}>↑</button>}
		  {hasDownButton && <button onClick={onMoveDown}>↓</button>}
	  </div>	
    <br />
  </div>                    
  }
}

class RecordCreator extends React.PureComponent {
  createDeleteHandler = () => {
    const {id, onDelete} = this.props
    return onDelete(id)
  }
  createMoveUpHandler = () => {
    const {id, onMoveUp} = this.props
    return onMoveUp(id)
  }
  createMoveDownHandler = () => {
    const {id, onMoveDown} = this.props
    return onMoveDown(id)
  }

  render () {
    return <Record {...this.props} onDelete={this.createDeleteHandler} 
        onMoveUp={this.createMoveUpHandler} onMoveDown={this.createMoveDownHandler} />
  }
}

const changeStateOnAddElement = prevState => prevState.currentText !== ''
  ? {
      elements: prevState.elements.concat({
        val: prevState.currentText, 
        id: prevState.nextId,
      }),
      currentText: "",
      nextId: prevState.nextId + 1,
  }
  : null

function swapElements (elements, firstIndex, secondIndex) {
  return elements.map((val, i, arr) =>
    i === firstIndex 
      ? arr[secondIndex]
      : i === secondIndex
        ? arr[firstIndex] 
        : val
  )
}


export default class App extends React.Component {
  state = {
    elements: [], 
    currentText: "",
    nextId: 0,
  }

  changeTextHandler = event => {
    this.setState({
      currentText: event.target.value
    })
    
  }

  deleteElementHandler = (index) => {
    this.setState ( (state) => ({
      elements: state.elements.filter((val) => val.id !== index)
    }))
  }

  moveUpElementHandler = (index) => {
    this.setState ( (state) => {
      const currentIndex = state.elements.findIndex((element) => element.id === index)
      return {
        elements: swapElements(state.elements, currentIndex, currentIndex - 1)
      }
    })
  }
  moveDownElementHandler = (index) => {
    this.setState ( (state) => {
      const currentIndex = state.elements.findIndex((element) => element.id === index)
      return {
        elements: swapElements(state.elements, currentIndex, currentIndex + 1)
      }
    })
  }



  addElementHandler = () => {
     this.setState(changeStateOnAddElement)
  }

  render() {
  return <div id="container">                      
        <div id="header" valign="top">
            <input className='recordtext' id="inputstr" value={this.state.currentText} onChange={this.changeTextHandler} /> 
            <button onClick={this.addElementHandler}>+</button>
        </div>  
        <br />                  
        <div id="content" valign="top">
          {this.state.elements.map( (record, i) => 
            <RecordCreator value={record.val} key={record.id} onDelete={this.deleteElementHandler} id={record.id}
              onMoveUp={this.moveUpElementHandler} onMoveDown={this.moveDownElementHandler}
              hasUpButton={i !== 0} hasDownButton={i !== this.state.elements.length - 1} />)}
			  </div>             
    </div>
  
  }
}
