let countryCodeList = ["GL","SV","GE","GY","ME","GR","BW","LK","OM","LT","MV","PT","WS","SL","BN","VG","JM","MP","SM","MW","MY","AS","TD","TW","AI","AG","DJ","CX","IE","CU","MU","BG","GP","GW","EG","MQ","BS","DE","LY","AR","VE","SS","KM","BA","NE","NI","ZM","BL","DM","GN","CD","GF","CF","AD","VC","EE","FO","VA","AT","CO","SN","SG","LA","KY","SZ","SD","TV","SY","UM","LR","MH","CH","IS","TC","ZW","BR","RW","LI","UZ","WF","SK","MS","US","BD","GI","AW","PA","PH","EC","RU","MZ","IR","CA","AF","ES","GD","YT","FK","RO","AZ","GG","KH","SR","BV","DZ","AM","TF","MA","BB","AO","SB","ML","NC","BE","FJ","LV","MX","MO","BH","YE","VI","MR","CK","MC","NU","PE","IO","RS","TZ","PK","BY","LC","PR","MM","SC","BM","UA","GM","PY","ST","DK","KR","PM","TN","KW","IT","GS","AX","CY","LU","PG","TG","HK","KI","MG","GB","BO","IM","SI","RE","KG","NZ","KZ","MK","HM","TO","XK","CL","BI","DO","EH","LS","KP","CC","BT","SO","NL","TJ","TL","LB","SX","UG","GH","AL","PW","FM","CW","FI","JE","NA","VN","AQ","PS","TR","MD","KN","AU","JP","HR","BF","ID","TM","CG","VU","BZ","ET","HN","PL","NR","NF","QA","HT","UY","KE","GQ","BJ","FR","TH","GU","MF","IN","JO","CR","NP","CV","TT","ZA","GA","ER","IL","NG","NO","PF","SE","IQ","PN","TK","CM","CN","AE","CI","MT","MN","GT","CZ","HU","SJ"];
// best score
let bestScore = [0];
if (localStorage.getItem("bestScore") !== null) {
    bestScore = JSON.parse(localStorage.getItem("bestScore"));
}
const getCountryCode = () => {
    let country1 = countryCodeList[Math.floor(Math.random()*countryCodeList.length)];
    let country2 = countryCodeList[Math.floor(Math.random()*countryCodeList.length)];
    return [country1, country2]
}
document.querySelector('.best').textContent = `Best Score: ${bestScore[bestScore.length-1]}`
function display(codelist){
    document.querySelector('.countries').innerHTML = '';
    if(codelist[0]==codelist[1]){
        document.querySelector('.countries').innerHTML = '';
        display(getCountryCode(codelist))
        return
    }
    for(let i of codelist){
        fetch(`https://restcountries.com/v3.1/alpha/${i}`)
        .then((response) => response.json())
        .then((object) => object[0])
        .then((data) => {
            
            let card = `<div class="card" onclick = 'check(this)'>
                                <img src="${data.flags.png}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.name.common}</h5>
                                    <p class="card-text">${data.population}</p>
                                </div>
                            </div>`
                document.querySelector('.countries').insertAdjacentHTML('beforeend', card)
        })
        .catch(err => {console.log(err);
            display(getCountryCode())})
    }
    document.querySelector('.countries').style.pointerEvents= 'auto'
}

display(getCountryCode(countryCodeList))

let score = 0;
function check(div){
    number = div.querySelector('.card-body').querySelector('.card-text').textContent
    let numberlist = [];
    for(i of document.querySelector('.countries').children){
        let a =Number(i.querySelector('p').textContent);
        numberlist.push(a)
        i.querySelector('.card-text').classList.add('checked')
    } 
    let max = 0;
    for(i of numberlist){
        if(i > max){
            max = i
        }
    }
    
    if(number == max){
        score++;
        document.querySelector('.correct .score').textContent = `Score: ${score}`
        div.querySelector('.card-body').classList.add('correct-answer')
        div.querySelector('.card-text').classList.add('white')
        document.querySelector('.buttonNext').classList.add('show')
    }else{
        div.querySelector('.card-body').classList.add('wrong-answer')
        div.querySelector('.card-text').classList.add('white')
        document.querySelector('.buttonRestart').classList.add('show')
        if(score > bestScore[bestScore.length-1]
            ){
            bestScore.push(score)
            bestScore.splice(0, 1)
            console.log(score)
            console.log(bestScore)
            localStorage.setItem("bestScore", JSON.stringify(bestScore))
            document.querySelector('.best').textContent = `Best Score: ${bestScore[bestScore.length-1]}`
        }
        
    }
    document.querySelector('.countries').style.pointerEvents= 'none'
    
}

document.querySelector('.buttonNext').addEventListener('click', next)
function next(){
    document.querySelector('.buttonNext').classList.remove('show')
    display(getCountryCode(countryCodeList))
}
// start button
document.querySelector('.start').addEventListener('click', ()=>{
    document.querySelector('#all').classList.remove('displayN')
    document.querySelector('.containerr').classList.add('displayN')

})
// restart button
document.querySelector('.buttonRestart').addEventListener('click', restart)
function restart(){
    console.log('restart')
    document.getElementById('all').classList.add('displayN')
    document.querySelector('.containerr').classList.remove('displayN')

    document.querySelector('.start').click()
    display(getCountryCode(countryCodeList))
    score = 0;
    document.querySelector('.correct .score').textContent = `Score: ${score}`;
    document.querySelector('.buttonRestart').classList.remove('show')
}