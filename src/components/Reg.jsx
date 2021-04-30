import React, { useState } from 'react';
import './reg.css';
let obj = JSON.parse(sessionStorage.data);
let cardIndex = 0;

const Reg = () => {
    const [aminNext, setAnimNext] = useState(false);
    const [animPrev, setAnimPrev] = useState(false);

    let obj = JSON.parse(sessionStorage.data);
    let cardIndexPrev = (cardIndex - 1) < 0 ? obj.record.length - 1 : cardIndex - 1;
    let cardIndexNext = (cardIndex + 1) >= obj.record.length ? 0 : cardIndex + 1;

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
        animationDelay: '0.9s',
        animation: 'flip-card-animate-down 0.4s linear forwards'  /* */
    }

    // useEffect(() => {
    //     cardIndexPrev = (cardIndex - 1) < 0 ? obj.record.length - 1 : cardIndex - 1;
    //     cardIndexNext = (cardIndex + 1) >= obj.record.length ? 0 : cardIndex + 1;
    // }, [])

    let flipCardFlip = cardTop(cardIndex, 'ddc-reg flip-card-flip', aminNext ? selectedAminationFlipCardFlipUp : null);
    let flipCardUnder = cardTop(cardIndexNext, 'ddc-reg flip-card-under', null);
    let flipCardNext = cardTop(cardIndexPrev, 'ddc-reg flip-card-next', animPrev ? selectedAminationFlipCardNextDown : null);
    let flipCardFlipBottom = cardBottom(cardIndex, 'ddc-reg flip-card-flip-bottom', animPrev ? selectedAminationFlipCardFlipBottomUp : null);
    let flipCardUnderBottom = cardBottom(cardIndexPrev, 'ddc-reg flip-card-under-bottom', null);
    let flipCardNextBottom = cardBottom(cardIndexNext, 'ddc-reg flip-card-next-bottom', aminNext ? selectedAminationFlipCardNextBottomDown : null);

    return (
        <div className="ddc-reg wrapper">
            <div className="ddc-reg flip-card">
                {flipCardFlip}
                {flipCardUnder}
                <div className="ddc-reg flip-card-extra">
                    <div className="ddc-reg flip-card-front"></div>
                </div>
                {flipCardNext}

                {flipCardFlipBottom}
                {flipCardUnderBottom}
                <div className="ddc-reg flip-card-extra-bottom">
                    <div className="ddc-reg flip-card-front-bottom"></div>
                </div>
                {flipCardNextBottom}
            </div>
            <div className="ddc-reg nav-button">
                <button id="leftButton" type="button" onClick={() => {
                    setAnimPrev(true);
                    setTimeout(() => {
                        cardIndex--;
                        if (cardIndex < 0) {cardIndex = obj.record.length - 1}
                        setAnimPrev(false);
                    }, 500);
                }}>{String.fromCharCode(8592)}</button>
                <button id="rightButton" type="button" onClick={() => {
                    setAnimNext(true);
                    setTimeout(() => {
                        cardIndex++;
                        if (cardIndex >= obj.record.length) {cardIndex = 0}
                        setAnimNext(false);
                    }, 500);                    
                }}>{String.fromCharCode(8594)}</button>
            </div>
        </div>
    )
}

function cardTop(index, className, style) {
    return (
        <div className={className} style={style}>
            <div className="ddc-reg flip-card-front">
                <img src={obj.record[index].img} alt={obj.record[index].name} />
                <p className="ddc-reg dog-name"><span className="ddc-reg decoration">&hearts;&nbsp;
            </span>{obj.record[index].name}<span className="ddc-reg decoration">&nbsp;&hearts;</span></p>
            </div>
        </div>
    )
}

function cardBottom(index, className, style) {
    let phoneNo = 'tel: ' + obj.record[index].owner.phoneNumber;
    let sex = 'unknown';
    if (obj.record[index].sex === 'female') { sex = String.fromCharCode(9792) }
    if (obj.record[index].sex === 'male') { sex = String.fromCharCode(9794) }

    return (
        <div className={className} style={style}>
            <div className="ddc-reg flip-card-front-bottom">
                <div className="ddc-reg title checked-in">Chip no:</div>
                <div className="ddc-reg chip-no">{obj.record[index].chipNumber}</div>
                <div className="ddc-reg title">Breed:</div>
                <div className="ddc-reg owner">{obj.record[index].breed}</div>
                <div className="ddc-reg breed-info"><button>More info</button></div>
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
                    <label className="ddc-reg switch">
                        <input type="checkbox" defaultChecked={obj.record[index].present} />
                        <span className="ddc-reg slider"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Reg;