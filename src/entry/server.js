import createApp from '../main'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        router.push(context.url)
        router.onReady(() => {
            const matchs = router.getMatchedComponents()
            if (matchs.length === 0) {
                reject({
                    code: 404
                })
            }
            resolve(app)
        }, reject)
    })
}