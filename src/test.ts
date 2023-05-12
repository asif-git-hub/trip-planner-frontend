import { determineDestinationType } from './utils/destination.utils';

const destination = "Fuji, Shizuoka, Japan"
// 
const destinationComponents = destination.split(",")

console.log(destinationComponents)

const region = destinationComponents.slice(1).toString()


// const d = determineDestinationType(dest)
console.log(region)