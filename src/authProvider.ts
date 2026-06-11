import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
    login: async ({ username, password }: { username: string; password: string }) => {
        if (username === 'admin' && password === 'tsilakely') {
            localStorage.setItem('auth', 'true');
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Invalid credentials'));
        }
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(new Error('Not authenticated'));
    },
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject(new Error('Unauthorized'));
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        return Promise.resolve(['admin']);
    },
};

export default authProvider;