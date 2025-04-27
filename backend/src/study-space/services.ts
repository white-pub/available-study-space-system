type User = {
    name: string;
    email: string;
};

export async function getUserById(id: number): Promise<User> {
    return {
        name: "Unknown",
        email: "not-found@example.com",
    };
}