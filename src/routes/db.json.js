import fs from "fs"

export const get = () => {
    let rawdata = fs.readFileSync('./src/routes/db/cards.json');
    let cards = JSON.parse(rawdata);

    return {
        body: {
            cards
        }
    }
}

export const post = async ({request}) => {
    const data = await request.json()

    if(data.action == "create"){
        let addData = data.content
        let rawdata = fs.readFileSync('./src/routes/db/cards.json');
        let cards = JSON.parse(rawdata);

        oldData = cards.first
        newData = [...addData, ...oldData]

        cards.first = newData

        fs.writeFileSync('./src/routes/db/cards.json', JSON.stringify(cards, null, 4), (err) => {
            if (err) throw err;
            console.log('Cards written');
        });
        return {}

    } else if(data.action == "edit"){

        let rawdata = fs.readFileSync('./src/routes/db/cards.json');
        let cards = JSON.parse(rawdata);

        let index = findWithAttr(cards[data.content.league], "id", data.content.id)

        cards[data.content.league][index] = data.content

        fs.writeFileSync('./src/routes/db/cards.json', JSON.stringify(cards, null, 4), (err) => {
            if (err) throw err;
            console.log('Cards written');
        });

        return {}

    } else if(data.action == "remove"){

        let rawdata = fs.readFileSync('./src/routes/db/cards.json');
        let cards = JSON.parse(rawdata);

        let index = findWithAttr(cards[data.content.league], "id", data.content.id)

        cards[data.content.league].splice(index, 1)

        fs.writeFileSync('./src/routes/db/cards.json', JSON.stringify(cards, null, 4), (err) => {
            if (err) throw err;
            console.log('Cards written');
        });

        return {}

    }
    
}

export function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

