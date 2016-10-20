import got from 'got'

const fetch = async username => await got.get(`https://instagram.com/${username}/`)
const sleep = (s = 0) => new Promise(r => setTimeout(r, s * 1000))

const run = async (username) => {
    const keepChecking = async () => {
        console.log(`Checking @${username}...`)
        let response
        try {
            response = await fetch(username)
        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
        if(response.body.match(new RegExp(username))){
            console.log(`Username ${username} taken. Rechecking...`)
            await sleep(2)
            return await keepChecking()
        }
        return true
    }

    const grabItNow = await keepChecking()
    console.log(grabItNow ? 'GO GET IT...' : 'Forever taken.')
}
(async() => {
    await run('benhowdle')
})()
