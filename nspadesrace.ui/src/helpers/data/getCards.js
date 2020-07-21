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
        "value": 'flower'
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
        "value": 'oneup'
    },
    {
        "id": 12,
        "value": 'oneup'
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
        "value": 'star'
    },
    {
        "id": 17,
        "value": 'star'
    },
    {
        "id": 18,
        "value": 'star'
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
        "value": 'tencoin'
    },
    {
        "id": 22,
        "value": 'tencoin'
    },
    {
        "id": 23,
        "value": 'tencoin'
    },
    {
        "id": 24,
        "value": 'tencoin'
    },
    {
        "id": 25,
        "value": 'tencoin'
    },
    {
        "id": 26,
        "value": 'twentycoin'
    },
    {
        "id": 27,
        "value": 'twentycoin'
    },
    {
        "id": 28,
        "value": 'twentycoin'
    },
    {
        "id": 29,
        "value": 'twentycoin'
    },
    {
        "id": 30,
        "value": 'twentycoin'
    },
    {
        "id": 31,
        "value": 'mushroom'
    },
    {
        "id": 32,
        "value": 'flower'
    },
    {
        "id": 33,
        "value": 'star'
    },
    {
        "id": 34,
        "value": 'oneup'
    },
    {
        "id": 35,
        "value": 'tencoin'
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
    const rowOne = arr.slice(0, 6); 
    const rowTwo = arr.slice(6, 12);
    const rowThree = arr.slice(12, 18);
    const rowFour = arr.slice(18, 24);
    const rowFive = arr.slice(24, 30);
    const rowSix = arr.slice(30, 36)
    return {
        rowOne,
        rowTwo,
        rowThree,
        rowFour,
        rowFive,
        rowSix
    }
}

const getCards = () => shuffle(cards);

export default { getCards };
