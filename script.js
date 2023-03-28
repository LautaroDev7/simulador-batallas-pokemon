/*--------------------pagina de seleccion de pokemones---------------------*/
let team = [];

const checkEvent = (event) => {
    const check = event.target.parentNode;
    check.firstElementChild.classList.toggle('invisible');

    if(check.classList.contains('elegido')){
        check.classList.remove('elegido');
        for(let i = 0; i <team.length; i++){
            if(team[i] === check.childNodes[5]){
                team.splice(i,1);
            }
        }
    }else{
        check.classList.add('elegido');
        team.push(check.childNodes[5]);
    }

}
const divTexto = document.createElement('div')

function prepararBatalla() {
    if(team.length===3){
        const team1 = [];
        for (let i = 0; i <3;i++){
            for (let j = 0 ; j < 9;j++){
                if (team[i].innerText == pokemones[j].name){
                    team1.push(pokemones[j]);   
                }
            }
        }
        const team2 = [];
        for (let i = 0; i <3;i++){
            team2.push (pokemones[Math.floor(Math.random()*9)]);
        }
        const divBatalla = document.getElementById('Batalla');
        const pokemonBatalla1 = document.getElementById(team1[0].name)
        divBatalla.appendChild(pokemonBatalla1.cloneNode(true));
        divTexto.classList.add('pokemon');
        divTexto.classList.add('textoBatalla');
        divTexto.setAttribute('id','textoBatalla');
        divBatalla.appendChild(divTexto);
        const pokemonBatalla2 = document.getElementById(team2[0].name)
        divBatalla.appendChild(pokemonBatalla2.cloneNode(true));
        divBatalla.firstElementChild.removeChild(divBatalla.firstElementChild.lastElementChild);
        divBatalla.lastElementChild.removeChild(divBatalla.lastElementChild.lastElementChild);
        iniciar(team1,team2);
    }
}
/*---------------------------------paginaBatalla-----------------------------------------------*/

function iniciar(team1,team2){
const fight = new battle(team1,team2);
fight.combat();
}


/*-------------------------------- objetos ,clases y metodos----------------------------*/
const charmanderPic = document.createElement('img');
charmanderPic.src = '006.png';
const rapidashPic = document.createElement('img');
rapidashPic.src = '078.png';
const arcaninePic = document.createElement('img');
arcaninePic.src = '059.png';
const blastoisePic = document.createElement('img');
blastoisePic.src = '009.png';
const golduckpic = document.createElement('img');
golduckpic.src = '055.png';
const poliwrathPic = document.createElement('img');
poliwrathPic.src = '062.png';
const venasaurPic = document.createElement('img');
venasaurPic.src = '003.png';
const roseliaPic = document.createElement('img');
roseliaPic.src = '315.png';
const meganiumPic = document.createElement('img');
meganiumPic.src = '154.png';



class pokemon {
    constructor(name,type,skills,hp,status,picture,pokHtml){
        this.name = name
        this.type = type
        this.skills = skills
        this.hp = hp
        this.status = status
        this.picture = picture
        this.pokHtml = pokHtml
    }
    attack(pokemon){
        if(this.hp>0){
            console.log(this.name,' esta atacando a '+ pokemon.name);
            let skill = this.skills[0];
            let power = skill.verifyElement(pokemon.type,skill.power );
            pokemon.reduceHp(power);
            console.log(pokemon)
        }else{
            console.log(this.name +' esta fuera de combate' + this.hp)
        }
    }
    
    reduceHp(power){
        this.hp -= power;
    }
}

class battle {
    constructor(team1,team2){
        this.team1 = team1 //array
        this.team2 = team2 //array
    }
    combat(){
        console.log('batalla iniciada');
        let indexTeam1=0;
        let indexTeam2=0;
        while(indexTeam1<this.team1.length && indexTeam2<this.team2.length){
            let pokemon1 = this.team1[indexTeam1];
            let pokemon2 = this.team2[indexTeam2]
            let survivor = this.attackUntillDefeat(pokemon1,pokemon2)
            if(survivor===pokemon1){
                console.log(pokemon2.name,' ha sido derrotado por ',pokemon1.name)
                indexTeam2++;
            }else{
                console.log(pokemon1.name,' ha sido derrotado por ',pokemon2.name)
                indexTeam1++;
            }
        }

        if(indexTeam1>indexTeam2){
            console.log('Gano el equipo 2');
        }else{
            console.log('Gano el equipo 1');
        }
        console.log('Equipo 1 : ',this.team1);
        console.log('Equipo 2 : ',this.team2);
    }   

    attackUntillDefeat(pokemon1,pokemon2){
        while(pokemon1.hp>0 && pokemon2.hp>0){
            divTexto.innerText='';
            divTexto.innerText = pokemon1.name + ' ataca a ' + pokemon2.name;
            pokemon1.attack(pokemon2);
            divTexto.innerText += '\n' + pokemon2.name + ' ataca a ' + pokemon1.name
            pokemon2.attack(pokemon1);
        }
        if (pokemon1.hp>0){
            console.log(pokemon1.name,' es el ganador');
            return pokemon1;
        }else{
            console.log(pokemon2.name,' es el ganador');
            return pokemon2;
        }
    }
}

class element{
    calculatePower(enemyElement,attack,strongVs,weakVs){
        if(enemyElement === weakVs){
           divTexto.innerText+= ' \n el ataque fue debil';
            return attack*.9;
        }else if (enemyElement === strongVs){
            divTexto.innerText +='\n el ataque fue fuerte';
            return attack*1.1;
        }else{
            return attack;
        }
    }
}

class water extends element{
    strong = 'fire';
    weak = 'plant';
    verifyElement(enemyElement,attack){
        return super.calculatePower(enemyElement,attack,this.strong,this.weak)
    }
}

class fire extends element{
    strong = 'plant';
    weak = 'water';
    verifyElement(enemyElement,attack){
        return super.calculatePower(enemyElement,attack,this.strong,this.weak)
    }
}

class plant extends element{
    strong = 'water';
    weak = 'fire';
    verifyElement(enemyElement,attack){
        return super.calculatePower(enemyElement,attack,this.strong,this.weak)
    }
}

class cascada extends water{
    power = 90 
}

class lanzaLlamas extends fire{
    power = 105
}

class hojaAfilada extends plant{
    power = 75
}


const charizard = new pokemon (
    'Charizard',
    'fire',
    [new lanzaLlamas()],
    950,
    true,
    charmanderPic
)

const rapidash = new pokemon(
    'Rapidash',
    'fire',
    [new lanzaLlamas()],
    950,
    true,
    rapidashPic,
    document.getElementById('Rapidash')
)

const arcanine = new pokemon(
    'Arcanine',
    'fire',
    [new lanzaLlamas()],
    950,
    true,
    arcaninePic
)

const blastoise = new pokemon(
    'Blastoise',
    'water',
    [new cascada()],
    1175,
    true,
    blastoisePic
)

const poliwrath = new pokemon(
    'Poliwrath',
    'water',
    [new cascada()],
    1175,
    true,
    poliwrathPic
)

const golduck = new pokemon(
    'Golduck',
    'water',
    [new cascada()],
    1175,
    true,
    golduckpic
)

const venasaur = new pokemon(
    'Venasaur',
    'plant',
    [new hojaAfilada()],
    1325,
    true,
    venasaurPic
)

const roselia = new pokemon(
    'Roselia',
    'plant',
    [new hojaAfilada()],
    1325,
    true,
    roseliaPic
)

const meganium = new pokemon(
    'Meganium',
    'plant',
    [new hojaAfilada()],
    1175,
    true,
    meganiumPic
)

const pokemones = [charizard,golduck,meganium,roselia,venasaur,poliwrath,arcanine,rapidash,blastoise];

for (let i=0; i<pokemones.length;i++ ){
    
}
/* mirar esto para ponerle hp al pokemon e ir reduciendo automaticamente en la batalla */
const pok = document.getElementById('Rapidash')
console.log(pok.childNodes[7].firstElementChild.innerText)
