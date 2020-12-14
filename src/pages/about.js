import React from 'react';

import photo from '../images/sarius.jpg'

function About() {
    return (
            <div className="container-fluid py-4">
                        <div className="col-lg-12 layer-1">
                                <div className="col-sm-12 slider-img ">
                                    <img src={photo} alt="about" />
                                </div>
                                <div className="slider-info col-sm-12 ">
                                    <div className="slider-info-inner">
                                        <h1 className="text-uppercase">Łukasz Biernat</h1>
                                        <div className="slider-brief">
                                            <p>Hi my name is Łukasz i am 18 years old student from Poland who is into photography. I do not have much expieriences but i try to get it and improve my skills everyday.</p>
                                            <p>My journey with photography started in 2017 where i used to take photos everyday and that has big impact on my current hobby</p>
                                            <p>My motivation are artists from all over the world who are doing sick work. They take great photos and find beauty and art in everyday life. Thanks to them I get inspiration which contributes to my own ideas.</p>
                                        </div>
                                    </div>
                            </div>
                </div>
            </div>
    );
}

export default About;
