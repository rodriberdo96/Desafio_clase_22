import parseargs from "minimist";

const options = {default: {puerto: 8080}};

const PORT= parseargs(process.argv, options).puerto;

export default PORT;