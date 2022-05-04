const threads = require("./threads.json")

Object.values(threads).forEach(thread => {
    const { from } = thread.messages[0]
    const email = from.match(/<[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*>/g)
    console.log("from > ", from, "email > ", email)
})