import PocketBase from 'pocketbase';

class PocketBaseService {
    constructor(private readonly pb: PocketBase) {
    }

    get PocketBaseInstance(): PocketBase {
        return pb;
    }

    async Logout() {
        console.log('Logging out');
        await pb.authStore.clear()
    }
}

const pb = new PocketBase('http://127.0.0.1:8090');
export const pbService = new PocketBaseService(pb)