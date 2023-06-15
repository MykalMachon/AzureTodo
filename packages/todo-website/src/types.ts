export interface Todo {
    userId: string;
    body: string;
    completed: boolean;
    id: string;
}

export interface User {
    userId: string;
    userRoles: Array<string>; // admin, user, etc
    claims: Array<{name: string, value: string}>; // email, name, etc
    identityProvider: string; // google, facebook, etc
    userDetails: string; // username 
}