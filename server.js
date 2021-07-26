const http = require('http');

const hostname = '127.0.0.1';
const port = 3004;

const data = Array.apply(null, {length: 100000}).map(
    Function.call,
    Math.random
);

const generalFunction = arr => {

    const unique = [];

    for (let i=0; i< arr.length; i++){

        const inputNum = arr[i];

        if(!unique.includes(inputNum)){
            unique.push(inputNum);
        }
    }

    return unique;
}

const optimizedFunction = arr => {

    const unique = [];
    const hashMap = {};

    for (let i =0; i < arr.length; i++){
        const inputNum = arr[i];

        if(!hashMap[inputNum]){
            unique.push(inputNum);
        }

        hashMap[inputNum] = true;
    }
    return unique;
}

const calculateDiff = (data) => {

    let result = [];
    let t1, t2;

    console.log(data.slice(0,10));
    t1 = Date.now();
    generalFunction(data);
    t2 = Date.now();

    console.log(`${(t2 - t1) / 1000} seconds`);

    result [0] = `General function executed in : ${(t2 - t1) / 1000} seconds`;

    console.log(data.slice(0,10));
    t1 = Date.now();
    optimizedFunction(data);
    t2 = Date.now();

    console.log(`${(t2 - t1) / 1000} seconds`)

    result [1] = `Optimized function executed in : ${(t2 - t1) / 1000} seconds`;

    return result;
}


const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  res.write('Low Throughput \n');
  res.write(generalFunction([1,2,3,4,2,6,1,4]).toString() + '\n');
  res.write(optimizedFunction([1,2,3,4,2,6,1,4]).toString() + '\n');
  
  res.write('High Throughput \n');
  result = calculateDiff(data);
  
  res.write(result[0] + '\n');
  res.write(result[1]);

  res.end(' Done!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});