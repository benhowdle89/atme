import got from 'got'

const fetch = async username => await got.head(`http://twitter.com/${username}`)
const sleep = (s = 0) => new Promise(r => setTimeout(r, s * 1000))

const run = async (username) => {
    const keepChecking = async () => {
        console.log(`Checking @${username}...`)
        const response = await fetch(username)
        if(response.headers.status.match(/200/)){
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
