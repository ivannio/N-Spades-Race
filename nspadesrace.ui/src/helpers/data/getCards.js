const cards = [
    {
        "id": 1,
        "value": 'mushroom'
    },
    {
        "id": 2,
        "value": 'mushroom'
    },
    {
        "id": 3,
        "value": 'mushroom'
    },
    {
        "id": 4,
        "value": 'mushroom'
    },
    {
        "id": 5,
        "value": 'mushroom'
    },    
    {
        "id": 6,
        "value": 'mushroom'
    },
    {
        "id": 7,
        "value": 'flower'
    },
    {
        "id": 8,
        "value": 'flower'
    },
    {
        "id": 9,
        "value": 'flower'
    },
    {
        "id": 10,
        "value": 'flower'
    },
    {
        "id": 11,
        "value": 'flower'
    },
    {
        "id": 12,
        "value": 'flower'
    },
    {
        "id": 13,
        "value": 'oneup'
    },
    {
        "id": 14,
        "value": 'oneup'
    },
    {
        "id": 15,
        "value": 'oneup'
    },
    {
        "id": 16,
        "value": 'oneup'
    },
    {
        "id": 17,
        "value": 'oneup'
    },
    {
        "id": 18,
        "value": 'oneup'
    },
    {
        "id": 19,
        "value": 'star'
    },
    {
        "id": 20,
        "value": 'star'
    },
    {
        "id": 21,
        "value": 'star'
    },
    {
        "id": 22,
        "value": 'star'
    },
    {
        "id": 23,
        "value": 'star'
    },
    {
        "id": 24,
        "value": 'star'
    },
    {
        "id": 25,
        "value": 'tencoin'
    },
    {
        "id": 26,
        "value": 'tencoin'
    },
    {
        "id": 27,
        "value": 'tencoin'
    },
    {
        "id": 28,
        "value": 'tencoin'
    },
    {
        "id": 29,
        "value": 'tencoin'
    },
    {
        "id": 30,
        "value": 'tencoin'
    },
    {
        "id": 31,
        "value": 'twentycoin'
    },
    {
        "id": 32,
        "value": 'twentycoin'
    },
    {
        "id": 33,
        "value": 'twentycoin'
    },
    {
        "id": 34,
        "value": 'twentycoin'
    },
    {
        "id": 35,
        "value": 'twentycoin'
    },
    {
        "id": 36,
        "value": 'twentycoin'
    },
];

const shuffle = (arr) => {    
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];   
    }
    return arr;    
}

const getCards = () => shuffle(cards);

export default { getCards, cards };
