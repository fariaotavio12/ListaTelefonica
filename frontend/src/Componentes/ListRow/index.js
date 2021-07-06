import React, { useState } from 'react';
import './styles.css';

import { Link } from 'react-router-dom';



export default function ListRow({ title, list, isFavorite }){

    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () =>{
        let valueScrollLeft = scrollX + Math.round(window.innerWidth / 2); 
        if (valueScrollLeft > 0) {
            valueScrollLeft = 0;
        }

        setScrollX(valueScrollLeft);
    }

    const handleRightArrow = () =>{

        let valueScrollRight = scrollX - Math.round(window.innerWidth / 2); 
        let widthListShows = list.length * 150;
        if ((window.innerWidth - widthListShows) > valueScrollRight) {
            valueScrollRight = (window.innerWidth - widthListShows) - 60;
        }
        setScrollX(valueScrollRight);
    }


    return(
        <div className='showsRow'>
            <h2 className='title'>{title}</h2>

            {
                list.length > 5 || window.innerWidth < 730 ? 

                <>
                    <div className="arrow-navigation-left" onClick={handleLeftArrow}>
                        <i className="fas fa-chevron-left"></i>
                    </div>

                    <div className="arrow-navigation-right" onClick={handleRightArrow}>
                        <i className="fas fa-chevron-right"></i>
                    </div>

                </>
                :
                <>
                </>
            }
                <div className="showsRow-content">
                    <div className="showsRow-list" style={{
                        marginLeft: scrollX,
                        width: list.length * 150
                        }}>
                        {list.length > 0 && list.map((show, key)=>{
                        let { image, name, id } = show;

                        return (
                            
                                <div key={key} className='showsRow-item'>
                                    <img src={image ? image.medium : "imagens/sem.jpg"} alt={name}/>
                                    {console.log(name)}
                                    <i 
                                        className={isFavorite.includes(id) ? "fas fa-heart" : "far fa-heart" } 
                                        style={{
                                            color:`${isFavorite.includes(id) ? '#cf112b' : "#fff"}`, 
                                            fontSize:30, 
                                            position:'absolute', 
                                            marginTop: 150, 
                                            marginLeft: -60,
                                            backgroundColor: 'rgba(0, 0, 0, 0.35)',
                                            padding: 10,
                                            borderRadius: 8 }}>
                                    </i>     
                                </div>
                            
                        )
                            })}
                    </div>
                </div>

        </div>
    )
}