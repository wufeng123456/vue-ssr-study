import createApp from '../main'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        router.push(context.url)
        router.onReady(() => {
            const matchs = router.getMatchedComponents()
            if (matchs.length === 0) {
                reject({
                    code: 404
                })
            }
            // resolve(app)
            Promise.all(matchs.map(component => {
                if (component.asyncData) {
                    return component.asyncData(store)
                }
            })).then((res) => {
                context.state = store.state;
                resolve(app)
            })
        }, reject)
    })
}