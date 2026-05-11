const HMDinput = document.getElementById('homoDinput');
const HMRinput = document.getElementById('homoRinput');
const checkButton = document.getElementById('checkButton');
const formatButton = document.getElementById('formatButton');
const geneConatiner = document.getElementById('simulationContainer');

let corArray = []
let newHMDperc = '';
let newHMRperc = '';
let newHTperc = '';

function doCheckData() {
    let HMDVal = parseInt(HMDinput.value);
    let HMRVal = parseInt(HMRinput.value);
    let GeneValTotal =HMRVal + HMDVal;

    if ((GeneValTotal) == 100) {
        checkButton.style.color = 'green';
        checkButton.style.border = '1px green solid';
        setTimeout(function(){
            checkButton.style.color = 'black';
            checkButton.style.border = ' 1px black solid';
            console.log('Check Complete')
        }, 1000);
        //runSimulation
        runDataSimulation()
    }
    else {
        checkButton.style.color = 'red';
        setTimeout(function(){
            checkButton.style.color = 'black';
            console.log('Check Failed')
            // Need text change in here
        }, 1000);
    }
}

function doFormatData() {
    let HMDVal = parseFloat(Math.abs(HMDinput.value));
    let HMRVal = parseFloat(Math.abs(HMRinput.value));

    if (HMDVal == 0 && HMRVal == 0) {
        HMDVal = Math.floor(Math.random()*99 +1);
        HMRVal = Math.floor(Math.random()*99 +1);
    }


    let GeneValTotal = HMRVal + HMDVal;

    HMDinput.value = Math.round((HMDVal/GeneValTotal)*100)
    HMRinput.value = Math.round((HMRVal/GeneValTotal)*100)
}

function runDataSimulation() {
    newHMDperc = '';
    newHMRperc = '';
    newHTperc = '';

    let HMDdec = (parseFloat(Math.abs(HMDinput.value)))/100;
    let HMRdec = (parseFloat(Math.abs(HMRinput.value)))/100;

    let HMDperc = (HMDdec * HMDdec) *100;
    let HTperc = (2 * HMDdec * HMRdec) *100;
    let HMRperc = (HMRdec * HMRdec) *100;

    let decHMD = HMDperc - Math.floor(HMDperc);
    let decHMR = HMRperc - Math.floor(HMRperc);
    let decHT = HTperc - Math.floor(HTperc);

    if (decHMD > decHMR && decHMD > decHT) {
        newHMDperc = Math.ceil(HMDperc);
        newHMRperc = Math.floor(HMRperc);
        newHTperc = Math.floor(HTperc);
    } else if (decHMR > decHMD && decHMR > decHT) {
        newHMRperc = Math.ceil(HMRperc);
        newHTperc = Math.floor(HTperc);
        newHMDperc = Math.floor(HMDperc);
    } else {
        newHTperc = Math.ceil(HTperc);
        newHMDperc = Math.floor(HMDperc);
        newHMRperc = Math.floor(HMRperc);
    }

    console.log(`HMD: ${HMDperc} / ${newHMDperc} | HT: ${HTperc} / ${newHTperc}| HMR: ${HMRperc} / ${newHMRperc}`);

    //---------------------------------------------------------------------------------------//

    corArray = []
    geneConatiner.innerHTML = '';
    let i = 0

    while (i < 100) {
        i++
        let corX = Math.random() *72 +25
        let corY = Math.random() *90 + 4

        corArray.forEach((item) => {
            if (item[0]== corX && item[1] == corY) {
                corX = Math.random() *72 +25
                corY = Math.random() *90 + 4
            }
        });

        corArray.push([corX, corY])
        let baseGC = geneConatiner.innerHTML
        if (i < newHMDperc) {
            geneConatiner.innerHTML = baseGC + `<div class="geneVis BB" style="left:${corX}%; top:${corY}%;"></div>`
            corArray[i-1].push(1)
        }else if (i < newHMDperc + newHTperc) {
            geneConatiner.innerHTML = baseGC + `<div class="geneVis Bb" style="left:${corX}%; top:${corY}%;"></div>`
            corArray[i-1].push(2)
        } else if (i < 100) {
            geneConatiner.innerHTML = baseGC + `<div class="geneVis bb" style="left:${corX}%; top:${corY}%;"></div>`
            corArray[i-1].push(3)
        }

    }

    corArray.forEach((item) => {
        console.log(item)
    }) 

    setTimeout(function(){
        doMove()
    }, 200)
}

function doMove() {
    // corArray.forEach((item) => {
    //     let doesMove = Math.floor(Math.random()*2)

    //     if (doesMove == 1) {
    //         let Xmove = Math.floor(Math.random()*10-5)
    //         let Ymove = Math.floor(Math.random()*10-5)

    //         let newX = corArray[item][0].value + Xmove
    //         let newY = corArray[item][1].value + Ymove

    //         corArray[item][0] = newX
    //         corArray[item][1] = newY

    //         geneBlobs[item].style.left = newX
    //         geneBlobs[item].style.left = newY
    //     }
    // })

    const geneBlobs = document.getElementsByClassName('geneVis');

    setInterval( function(){
        document.querySelectorAll('geneBlobs').forEach((item) => {
            let doesMove = Math.floor(Math.random()*2)

            if (doesMove == 1) {
                let Xmove = Math.floor(Math.random()*10-5)
                let Ymove = Math.floor(Math.random()*10-5)
    
                let newX = corArray[item][0].value + Xmove
                let newY = corArray[item][1].value + Ymove
    
                geneBlobs[item].style.left = newX
                geneBlobs[item].style.left = newY
                console.log('moved')
            }
        })
    }, 500)

}


checkButton.addEventListener('click', doCheckData);
formatButton.addEventListener('click', doFormatData);
// document.addEventListener('fullscreenchange', )
