
import * as fs from 'fs';


const wordsPath = 'src/english.txt'
const textPath = 'src/text.txt'

let wordsStream = fs.createReadStream(wordsPath)
let textStream = fs.createReadStream(textPath)

interface TextObj{
    [key: string]: number
}


let text = {} as TextObj
let matches = {} as TextObj



textStream.on('data', (chunk) => {
    let words = chunk.toString().split(' ')

    // console.log(words)
    words.reduce((acc, word) => {
        word = word.toLowerCase().replace(/[\W]+/g, '')
        if(!text[word]){
            text[word] = 1
        } else {
            text[word]++
        }
        return acc
    }, text)
}).on('end', () => {
    // console.log(JSON.stringify(text, null, 2 ))
    wordsStream.on('data', (chunk) => {
        let words = chunk.toString().split('\n')

        // console.log(words)
        words.reduce((acc, word) => {
            word = word.toLowerCase().replace(/[\W]+/g, '')
            if(text[word]){
                if(!matches[word]){
                    matches[word] = 1
                } else {
                    matches[word]++
                }
            }
            return acc
        }, matches)
    }).on('end', () => {
        console.log(JSON.stringify(matches, null, 2 ))
    })
})
