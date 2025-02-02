export const isLoggedIn = (): Promise<{name: string, id: string, email: string}> => {


    return Promise.resolve({name: 'shaked', id: '123456', email: 'shak@gm.ci'})
    
}
