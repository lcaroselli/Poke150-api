const Nightmare = require('nightmare');
const nightmare = Nightmare( { show: true } );
const fs = require('fs');

nightmare
  .goto('http://pokedream.com/pokedex/pokemon?display=gen1')
  .evaluate(() => {
    let pokeNodes = document.querySelectorAll('.UILinkedTableRow');

    let pokeInfo = [];

    for (let i = 0; i < pokeNodes.length; i++) {
      let name = pokeNodes[i].querySelector('.rowLink').innerText;
      let pokemonId = pokeNodes[i].querySelectorAll('td')[1].innerText;
      let primaryType = pokeNodes[i].querySelectorAll('td')[3].getAttribute('class');
      let pokemonHp = pokeNodes[i].querySelectorAll('td')[5].innerText;
      let pokemonAttackPower = pokeNodes[i].querySelectorAll('td')[6].innerText;
      let pokemonDefensePower = pokeNodes[i].querySelectorAll('td')[7].innerText;
      let pokemonTotalStat = pokeNodes[i].querySelectorAll('td')[11].innerText;

      pokeInfo.push({ name, pokemonId, primaryType, pokemonHp, pokemonAttackPower, pokemonDefensePower, pokemonTotalStat });
    }

    return pokeInfo
  })
  .end()
  .then((result) => {
    let output = JSON.stringify(result, null, 2);

    fs.writeFile('./pokemon-data.json', output, 'utf8', (err) => {
      if (err) {
        return console.error(err)
      }
    })
    console.log('File was saved.')
  })
  .catch((error) => {
    console.error('Pokemon search failed', error)
  });
