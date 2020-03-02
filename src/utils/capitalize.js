export default str => {
    if( typeof str !== "string") return str

    return str.split(" ").map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(" ")
}