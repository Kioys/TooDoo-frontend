import Parse from 'parse';

let isInitialized = false;

const initializeParse = () => {
  if (!isInitialized) {
    Parse.initialize('1');
    Parse.serverURL = 'http://localhost:1337/parse';
    console.log("se ha iniciado parse")
    isInitialized = true;
  }
};

initializeParse();

export default Parse;