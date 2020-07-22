const cards = [
    {
        "id": 1,
        "matched": false,
        "active": false,
        "value": 'mushroom'
    },
    {
        "id": 2,
        "matched": false,
        "active": false,
        "value": 'mushroom'
    },
    {
        "id": 3,
        "matched": false,
        "active": false,
        "value": 'mushroom'
    },
    {
        "id": 4,
        "matched": false,
        "active": false,
        "value": 'mushroom'
    },
    {
        "id": 5,
        "matched": false,
        "active": false,
        "value": 'mushroom'
    },    
    {
        "id": 6,
        "matched": false,
        "active": false,
        "value": 'flower'
    },
    {
        "id": 7,
        "matched": false,
        "active": false,
        "value": 'flower'
    },
    {
        "id": 8,
        "matched": false,
        "active": false,
        "value": 'flower'
    },
    {
        "id": 9,
        "matched": false,
        "active": false,
        "value": 'flower'
    },
    {
        "id": 10,
        "matched": false,
        "active": false,
        "value": 'flower'
    },
    {
        "id": 11,
        "matched": false,
        "active": false,
        "value": 'oneup'
    },
    {
        "id": 12,
        "matched": false,
        "active": false,
        "value": 'oneup'
    },
    {
        "id": 13,
        "matched": false,
        "active": false,
        "value": 'oneup'
    },
    {
        "id": 14,
        "matched": false,
        "active": false,
        "value": 'oneup'
    },
    {
        "id": 15,
        "matched": false,
        "active": false,
        "value": 'oneup'
    },
    {
        "id": 16,
        "matched": false,
        "active": false,
        "value": 'star'
    },
    {
        "id": 17,
        "matched": false,
        "active": false,
        "value": 'star'
    },
    {
        "id": 18,
        "matched": false,
        "active": false,
        "value": 'star'
    },
    {
        "id": 19,
        "matched": false,
        "active": false,
        "value": 'star'
    },
    {
        "id": 20,
        "matched": false,
        "active": false,
        "value": 'star'
    },
    {
        "id": 21,
        "matched": false,
        "active": false,
        "value": 'tencoin'
    },
    {
        "id": 22,
        "matched": false,
        "active": false,
        "value": 'tencoin'
    },
    {
        "id": 23,
        "matched": false,
        "active": false,
        "value": 'tencoin'
    },
    {
        "id": 24,
        "matched": false,
        "active": false,
        "value": 'tencoin'
    },
    {
        "id": 25,
        "matched": false,
        "active": false,
        "value": 'tencoin'
    },
    {
        "id": 26,
        "matched": false,
        "active": false,
        "value": 'twentycoin'
    },
    {
        "id": 27,
        "matched": false,
        "active": false,
        "value": 'twentycoin'
    },
    {
        "id": 28,
        "matched": false,
        "active": false,
        "value": 'twentycoin'
    },
    {
        "id": 29,
        "matched": false,
        "active": false,
        "value": 'twentycoin'
    },
    {
        "id": 30,
        "matched": false,
        "active": false,
        "value": 'twentycoin'
    },
    {
        "id": 31,
        "matched": false,
        "active": false,
        "value": 'mushroom'
    },
    {
        "id": 32,
        "matched": false,
        "active": false,
        "value": 'flower'
    },
    {
        "id": 33,
        "matched": false,
        "active": false,
        "value": 'star'
    },
    {
        "id": 34,
        "matched": false,
        "active": false,
        "value": 'oneup'
    },
    {
        "id": 35,
        "matched": false,
        "active": false,
        "value": 'tencoin'
    },
    {
        "id": 36,
        "matched": false,
        "active": false,
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

export default { getCards };
