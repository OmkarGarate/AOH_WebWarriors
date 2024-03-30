import React, { useState } from 'react';
import filter from '../Images/filter.png';

function Category() {
    const [isCategoryVisible, setIsCategoryVisible] = useState(false);

    const toggleCategoryVisibility = () => {
        setIsCategoryVisible(!isCategoryVisible);
    };

    return (
        <>
            <div className="categoryMain">
                <div className="cateBtn">
                    <button onClick={toggleCategoryVisibility}>Filter<img src={filter} alt="Filter" /></button>
                </div>
                <div className={`category ${isCategoryVisible ? 'visible' : 'hidden'}`}>
                    <div className="cateBtn">
                        <button>Cultural Events</button>
                    </div>
                    <div className="cateBtn">
                        <button>Sports Events</button>
                    </div>
                    <div className="cateBtn">
                        <button>Technical Events</button>
                    </div>
                    <div className="cateBtn">
                        <button>E-Sports Events</button>
                    </div>
                    <div className="cateBtn">
                        <button>Placement Drives</button>
                    </div>
                    <div className="cateBtn">
                        <button>Others</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
