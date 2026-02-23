import {SESClient} from "@aws-sdk/client-ses";
const REGION="";

const sesClient =new SESClient({region:REGION})

export {sesClient};