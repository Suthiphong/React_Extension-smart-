import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {CopyToClipboard} from 'react-copy-to-clipboard'

const newObj = (newData) =>{
  //console.log(JSON.parse(newData))
  
  newData = JSON.parse(newData)

  let nodeDataArray = newData.nodeDataArray.map((item)=>{
    //let zOrder = (item.source != '../img/symbol/original/116.png') ? 20 : 2
    let DataSource = (item.source != '../img/symbol/original/116.png') ? "3" : "1"
    let datafield = (item.source != '../img/symbol/original/116.png') ? "STATUS_STATE" : "CUR_VALUE"
    if(item.category == 'valve')
      return { 
          ...item,
          DataSource,
          datafield
      }
    if(item.category == 'static_text' || item.category == 'text_nomodel' || item.category == 'HyperLink')
    {
      let format = '###0.0000 U'
      return {
        ...item,
        format,
      }
    }
    else{
      return {
        ...item
      }
    }
   
    })
    return {
      ...newData,
      nodeDataArray
    }
   
    

}



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      oldjson: null,
      newjson: null,
      copied: false
    }
  }

  textAreaHandle = (even) => {
    this.setState({
      oldjson: even.target.value,
      copied: false
    })
  }

  ConvertHandle = () => {
    //console.log(newObj(this.state.jsonOld))
    let NewData = newObj(this.state.oldjson)
    this.setState({
      newjson: NewData
    })
 
   }

   copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    this.setState({
      copied: true
    })
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();

  }
 


  render() {

    return (
      <div className="App">
        <textarea placeholder="ใส่ข้อมูล CODE" style={{borderRadius: 10,margin:5}}  onChange={this.textAreaHandle}></textarea>
        <textarea placeholder="OUTPUT" style={{borderRadius: 10,margin:5, display: 'none'}} ref={(textarea) => this.textArea = textarea} value={(this.state.newjson) ? JSON.stringify(this.state.newjson) : ""}></textarea>
        <button className="btn" onClick={this.ConvertHandle}>{(this.state.newjson) ? "เรียบร้อย" : "แปลงข้อมูล"}</button><br/> 
        <button className="btn" onClick={this.copyToClipboard}>{(this.state.copied) ? "เรียบร้อย" : "ก็อบปี้ข้อมูล"}</button><br/> 
      </div>
    );
  }
}

export default App;
