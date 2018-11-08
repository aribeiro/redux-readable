export function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

export function formatDate(timestamp){
    const date = new Date(timestamp)
    const newDate = `${('0' + date.getDate()).slice(-2)}/${('0' + date.getMonth()).slice(-2)}/${date.getFullYear()}`
    const newTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}` 
    return `${newDate} ${newTime}`
}

export function sortParam(sort){
    switch(sort){
        case "latest" :
            return "-timestamp"
        case "oldest" :
            return "timestamp"
        case "title" :
            return "title"
        case "titleDesc" :
            return "-title"
        case "author" :
            return "author"
        case "authorDesc" :
            return "-author"
        case "mostVoted" :
            return "-voteScore"
        case "lessVoted" :
            return "voteScore"
        default: 
            return "-voteScore"
    }
}
