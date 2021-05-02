import React, { useState, useEffect } from 'react';
import './reg.css';
import noDog from '../img/nodog.png';
let cardIndex = 0;
let yDown = null;
let animationGoingOn = false;

const Reg = () => {
    const [aminNext, setAnimNext] = useState(false);
    const [animPrev, setAnimPrev] = useState(false);

    let obj = JSON.parse(sessionStorage.data);
    let recordLength = obj.record.length;
    if (cardIndex >= recordLength) { cardIndex = 0 }
    let cardIndexPrev = (cardIndex - 1) < 0 ? recordLength - 1 : cardIndex - 1;
    let cardIndexNext = (cardIndex + 1) >= recordLength ? 0 : cardIndex + 1;

    useEffect(() => {
        if (recordLength > 1) {
            cardIndex = recordLength - 1;
            animationGoingOn = true;
            setAnimNext(true);
            setTimeout(() => {
                cardIndex++;
                cardIndex = 0;
                animationGoingOn = false;
                setAnimNext(false);
            }, 500);
        }
    }, [])

    // Next dog
    const selectedAminationFlipCardFlipUp = {
        animation: 'flip-card-flip-animate-up 0.2s linear forwards'
    }

    const selectedAminationFlipCardNextBottomDown = {
        animation: 'flip-card-animate-bottom-down 0.4s linear forwards' /* */
    }

    // Previous dog
    const selectedAminationFlipCardFlipBottomUp = {
        animation: 'flip-card-animate-bottom-up 0.2s linear forwards'
    }

    const selectedAminationFlipCardNextDown = {
        animation: 'flip-card-animate-down 0.4s linear forwards'  /* */
    }

    let flipCardFlip = cardTop(cardIndex, 'ddc-reg flip-card-flip', aminNext ? selectedAminationFlipCardFlipUp : null, obj);
    let flipCardUnder = cardTop(cardIndexNext, 'ddc-reg flip-card-under', null, obj);
    let flipCardNext = cardTop(cardIndexPrev, 'ddc-reg flip-card-next', animPrev ? selectedAminationFlipCardNextDown : null, obj);
    let flipCardFlipBottom = null;
    let flipCardUnderBottom = null;
    let flipCardNextBottom = null;
    if (obj.record[cardIndex].chipNumber === 'AIK1891AIK') {
        flipCardFlipBottom = cardBottomEmpty('ddc-reg flip-card-flip-bottom', animPrev ? selectedAminationFlipCardFlipBottomUp : null);
        flipCardUnderBottom = cardBottomEmpty('ddc-reg flip-card-under-bottom', null);
        flipCardNextBottom = cardBottomEmpty('ddc-reg flip-card-next-bottom', aminNext ? selectedAminationFlipCardNextBottomDown : null);
    } else {
        flipCardFlipBottom = CardBottom(cardIndex, 'ddc-reg flip-card-flip-bottom', animPrev ? selectedAminationFlipCardFlipBottomUp : null, obj);
        flipCardUnderBottom = CardBottom(cardIndexPrev, 'ddc-reg flip-card-under-bottom', null, obj);
        flipCardNextBottom = CardBottom(cardIndexNext, 'ddc-reg flip-card-next-bottom', aminNext ? selectedAminationFlipCardNextBottomDown : null, obj);
    }
    let flipCardExtra = '';
    let flipCardExtraBottom = '';
    if (recordLength > 2) {
        flipCardExtra = <div className="ddc-reg flip-card-extra"><div className="ddc-reg flip-card-front"></div></div>;
        flipCardExtraBottom = <div className="ddc-reg flip-card-extra-bottom"><div className="ddc-reg flip-card-front-bottom"></div></div>;
    }

    return (
        <div className="ddc-reg wrapper" onTouchStart={(e) => { yDown = e.touches[0].clientY }} onTouchMove={(e) => {
            if (!animationGoingOn) {
                if ((yDown - e.touches[0].clientY) > 5) {
                    animationGoingOn = true;
                    setAnimPrev(true);
                    setTimeout(() => {
                        yDown = e.touches[0].clientY;
                        cardIndex = (cardIndex - 1) < 0 ? obj.record.length - 1 : cardIndex - 1;
                        animationGoingOn = false;
                        setAnimPrev(false);
                    }, 500);
                } else if ((yDown - e.touches[0].clientY) < -5) {
                    animationGoingOn = true;
                    setAnimNext(true);
                    setTimeout(() => {
                        yDown = e.touches[0].clientY;
                        cardIndex = (cardIndex + 1) >= obj.record.length ? 0 : cardIndex + 1;
                        animationGoingOn = false;
                        setAnimNext(false);
                    }, 500);
                }
            }
        }}>
            <div className="ddc-reg flip-card">
                {flipCardFlip}
                {flipCardUnder}
                {flipCardExtra}
                {flipCardNext}

                {flipCardFlipBottom}
                {flipCardUnderBottom}
                {flipCardExtraBottom}
                {flipCardNextBottom}
            </div>
            <div className="ddc-reg nav-button">
                <button id="leftButton" type="button" onClick={() => {
                    if (!animationGoingOn) {
                        animationGoingOn = true;
                        setAnimPrev(true);
                        setTimeout(() => {
                            cardIndex--;
                            if (cardIndex < 0) { cardIndex = obj.record.length - 1 }
                            animationGoingOn = false;
                            setAnimPrev(false);
                        }, 500);
                    }
                }}>{String.fromCharCode(8592)}</button>
                <button id="rightButton" type="button" onClick={() => {
                    if (!animationGoingOn) {
                        animationGoingOn = true;
                        setAnimNext(true);
                        setTimeout(() => {
                            cardIndex++;
                            if (cardIndex >= obj.record.length) { cardIndex = 0 }
                            animationGoingOn = false;
                            setAnimNext(false);
                        }, 500);
                    }
                }}>{String.fromCharCode(8594)}</button>
            </div>
        </div>
    )
}

function cardTop(index, className, style, obj) {
    return (
        <div className={className} style={style}>
            <div className="ddc-reg flip-card-front">
                <img src={obj.record[index].img === '' ? noDog : obj.record[index].img} alt={obj.record[index].name} />
                <p className="ddc-reg dog-name"><span className="ddc-reg decoration">&hearts;&nbsp;
            </span>{obj.record[index].name}<span className="ddc-reg decoration">&nbsp;&hearts;</span></p>
            </div>
        </div>
    )
}

function CardBottom(index, className, style, obj) {
    let phoneNo = 'tel: ' + obj.record[index].owner.phoneNumber;
    let sex = 'unknown';
    if (obj.record[index].sex === 'female') { sex = String.fromCharCode(9792) }
    if (obj.record[index].sex === 'male') { sex = String.fromCharCode(9794) }
    let checkInClass = 'ddc-reg checked-in-lamp';
    let checkOutClass = 'ddc-reg checked-out-lamp';
    if (obj.record[index].present) {
        checkInClass += ' on';
    } else {
        checkOutClass += ' on';
    }

    return (
        <div className={className} style={style}>
            <div className="ddc-reg flip-card-front-bottom">
                <div className="ddc-reg title checked-in">Chip no:</div>
                <div className="ddc-reg chip-no">{obj.record[index].chipNumber}</div>
                <div className="ddc-reg title">Breed:</div>
                <div className="ddc-reg breed">{obj.record[index].breed}</div>
                <div className="ddc-reg title">Sex:</div>
                <div className="ddc-reg sex">{sex}</div>
                <div className="ddc-reg title">Age:</div>
                <div>{obj.record[index].age}</div>
                <div className="ddc-reg title">Owner:</div>
                <div className="ddc-reg owner">
                    {obj.record[index].owner.name} &nbsp;
                    {obj.record[index].owner.lastName}
                </div>
                <div className="ddc-reg phone">
                    <a href={phoneNo}>{String.fromCharCode(9742)}</a>
                </div>
                <div className="ddc-reg title checked-in">Checked in:</div>
                <div className="ddc-reg toggle-button">
                    <div className={checkOutClass}></div>
                    <div className={checkInClass}></div>
                </div>
            </div>
        </div>
    )
}


function cardBottomEmpty(className, style) {
    return (
        <div className={className} style={style}>
            <div className="ddc-reg flip-card-front-bottom">
                <div id="no-dog" className="ddc-reg title">
                    Sorry but we can not find any dog by that name.....
            </div>
            </div>
        </div>
    )
}

export default Reg;