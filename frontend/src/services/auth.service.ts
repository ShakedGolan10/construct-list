export const isLoggedIn = (): Promise<{name: string, id: string, email: string}> => {
    return new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject('no!') // ✅ Now properly rejects after 2.5 seconds
        }, 2500)
    })
}
