import { mmkvStorage } from '../shared/services/storage/mmkvStorage';

const persistConfig = {
    key: 'root',
    storage: mmkvStorage,
    whitelist: ['auth', 'company', 'profile', 'home'],
    blacklist: [''],
};

export default persistConfig;