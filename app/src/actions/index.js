import fetch from 'cross-fetch'

export const REQ_CHAR = 'REQ_CHAR'
function reqChar(gameofthrones) {
    return {
        type: REQ_CHAR,
        gameofthrones
    }
}

export const REC_CHAR = 'REC_CHAR'
function recChar(gameofthrones, json) {
    return {
        type: REC_CHAR,
        gameofthrones,
        char: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export const INVALIDATE_GAMEOFTHRONES = 'INALIDATE_GAMEOFTHRONES'
export function invalidateGameofthrones(gameofthrones) {
    return {
        type: INVALIDATE_GAMEOFTHRONES,
        gameofthrones
    }
}

export function fetchChar(gameofthrones) {
    return function(dispatch) {
        dispatch(reqChar(gameofthrones))

        return fetch(`https://anapioficeandfire.com/api/characters/${gameofthrones}.json`)
            .then(
                res => res.json(),
                err => console.log('An error occured.', error)
            )
            .then(json =>
                dispatch(recChar(gameofthrones, json))
            )
    }
}