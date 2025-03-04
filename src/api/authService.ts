interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    id: number;
    name: string;
    email: string;
    token: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error en la autenticación');
    }

    return await response.json();
};
