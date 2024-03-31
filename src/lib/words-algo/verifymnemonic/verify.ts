
import words from "../words";
import { decToBin } from "../conversion";
import checksum from "../checksum"

async function verify(mnemonic:string[]){

    try{

        let mnemonicBit=[];

        for(let i=0;i<words.length;i++){
    
            let word = words[i];
    
            for(let j=0;j<mnemonic.length;j++){
    
                if(word === mnemonic[j]){
    
                    mnemonicBit[j]=decToBin(i,11);
                }
    
    
            }
    
    
        }
    
    
        const checksumExtracted = mnemonicBit.join("").slice(128)
    
        const randomEntropy = mnemonicBit.join("").slice(0,128);
    
        const calcChecksum = await checksum(randomEntropy)
    
    
        if(checksumExtracted === calcChecksum){
    
            return true;
            console.log("True")
        }
    
        else{
            return false;
            console.log("false")
        }
    }
    catch(e){

        return false;
    }
   



}

export default verify;