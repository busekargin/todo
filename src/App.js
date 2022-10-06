import React from "react";
import { Button, Input, Modal, Space,Table,Select } from "antd";
import TodoList from './components/TodoList';
import 'antd/dist/antd.css';
import './App.css';
import { useState } from "react";

const App =() =>{
  return(
  <>
  <h1 id="todo">To-do List</h1> 
    <TodoList />
  </>)
}

export default App;