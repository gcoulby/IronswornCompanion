class DiceRoller {
  // state = {
  //   useQuantum: false,
  //   CACHE_SIZE: 1000,
  // };

  // constructor(useQuantum = false) {
  //   this.state.useQuantum = useQuantum;
  //   let cache = this.Cache;
  //   this.getRandomWord();
  // }

  // get Cache() {
  //   let cache = JSON.parse(localStorage.getItem("dice"));
  //   if (cache === undefined || cache === null || cache.length < 300) {
  //     if (this.state.useQuantum) {
  //       //populate with pseudo random initially, to ensure
  //       //there is always values in the cache (in the event
  //       //async request is delayed - or fails);
  //       this.cache_quantum_random_numbers();
  //       return this.get_psuedo_random_numbers();
  //     } else {
  //       let cache = this.get_psuedo_random_numbers();
  //       this.Cache = cache;
  //       return cache;
  //     }
  //   }
  //   this.Cache = cache;
  //   return cache;
  // }

  // set Cache(value) {
  //   localStorage.setItem("dice", JSON.stringify(value));
  // }

  // async fetch_quantum_random_numbers() {
  //   let url = `https://qrng.anu.edu.au/API/jsonI.php?length=${this.state.CACHE_SIZE}&type=uint8`;
  //   const response = await fetch(url);
  //   const numbers = await response.json();
  //   // const data = await numbers["data"];
  //   return numbers;
  // }

  // cache_quantum_random_numbers() {
  //   let numbers = this.fetch_quantum_random_numbers();
  //   let cache = new Array(this.state.CACHE_SIZE);
  //   numbers.then((data) => {
  //     for (let i = 0; i < this.state.CACHE_SIZE; i++) {
  //       cache[i] = data["data"][i];
  //     }
  //     this.Cache = cache;
  //   });
  // }

  // get_psuedo_random_numbers() {
  //   let cache = new Array(this.state.CACHE_SIZE);
  //   for (let i = 0; i < this.state.CACHE_SIZE; i++) {
  //     cache[i] = Math.floor(Math.random() * 255) + 1;
  //   }
  //   return cache;
  // }

  // shuffle_array(array) {
  //   for (var i = array.length - 1; i > 0; i--) {
  //     var j = Math.floor(Math.random() * (i + 1));
  //     var temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // }

  /*
    Pass in an array of dice by specifying
    the number of sides in each array position
    e.g. 2 x D4 and 1 x D20 = [4, 4, 20]
    use plusOne = true if you want a die result
    e.g. 1-6, use plusOne = false if you want
    to roll on an array
    */
  roll(dice, plusOne = false) {
    let dice_results = new Array(dice.length);
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i] === 100 ? 10 : dice[i];
      let result = Math.floor(Math.random() * die);
      result += plusOne ? 1 : 0;
      if (dice[i] === 100)
        dice_results[i] = { sides: dice[i], value: result * 10 };
      else dice_results[i] = { sides: dice[i], value: result };
    }
    return dice_results;
  }

  getRandomWord() {
    let w = 0x00;
    for (let i = 0; i < 16; i++) {
      w = w << 1;
      w += Math.round(Math.random());
    }
    return w;
  }
}

export default DiceRoller;
