import { ReactElement, useState } from 'react';
import './App.css'
import { DraggableDiv } from './dragDiv';
import { InputConnItem } from './InputSection';



export const NodeInfoWindow = () =>  {
	return (
		<div className='nodeInfoWindow'></div>
    );
}

export const TopBar = ({setIsHiden}:any) => {
    
    return (
        <header className='topBar'>
			<button onClick={() => setIsHiden((prev:boolean) => (!prev))}>click</button>
			<button>click</button>
		</header>
    )
}


export const MainScreen = ({isHiden, inputList}:any) => {

	const sectionStyle:React.CSSProperties = {
        height: "calc(85vh - 6px)",
		width: "15%",
        border: "3px solid purple",
        position: "absolute",
        margin: "0",
        padding: "0",
        listStyleType: "none",
        left: "-28px",
		cursor: "auto"
    };

    return (
        <main className='mainScreen' onContextMenu={(e) => {e.preventDefault()}}>
			<div className='playArea'>
				<DraggableDiv />


				<ul style={sectionStyle}>
					{inputList.map((x:any, index:any)=> (
						<li key={index}>
							{x}
						</li>
					))} 
				</ul>
				{isHiden && (
					<NodeInfoWindow />
				)}
				
			</div>
		</main>
    )
}
export const LowBar = ({setInputList}:any) => {
    return (
        <footer className='lowBar'>
			<div className='quickNodes'>
				<button>ff</button>
				<button>ff</button>
			</div>
			<div className='menuLowRight'>
				<button onClick={()=> setInputList((list:any)=>[...list, <InputConnItem/>])}>in edit</button>
				<button>out edit</button>
				<button>.</button>
			</div>
		</footer>
    )
}