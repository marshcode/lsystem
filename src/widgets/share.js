const get_share_blob =function(curve){
    const json = JSON.stringify(curve)
    return btoa(json)
}

const parse_share_blob = function(blob){
    const json = atob(blob)
    return JSON.parse(json)
}