  
const TOKEN_KEY = 'user';

export const login = (user) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}