import { mmkvStorage } from '../shared/services/storage/mmkvStorage';

const persistConfig = {
    key: 'root',
    storage: mmkvStorage,
    whitelist: ['auth', 'company'],
    blacklist: [''],
};

export default persistConfig;
