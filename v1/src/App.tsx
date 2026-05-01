import { ReactElement, useEffect, useState } from 'react'
import {LowBar, TopBar, MainScreen}  from './div';
import './App.css'

function App() {
	const [isHiden, setIsHiden] = useState(false);
	const [inputList, setInputList] = useState([]);

  return (
	<>
	<div >
		<TopBar setIsHiden={setIsHiden}/>
		<MainScreen isHiden={isHiden} inputList={inputList} />
		<LowBar setInputList={setInputList}/>
	</div>
	</>
  )
}

export default App