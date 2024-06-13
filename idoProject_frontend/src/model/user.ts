export type User = {
    name: string,
    password: string
    email: string
    age: Number
    imgUrl: string
}


const getAllUsers = async (): Promise<User[]> => {
    console.log('getAllUsers');
    try {
    const response = await fetch('http://localhost:3000/user');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users: User[] = await response.json();
    console.log('Fetched users:', users);
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return []; 
  }
};


const getUser = async (id: string): Promise<User> => {
    const response = await fetch(`http://localhost:3000/user/${id}`);
    const user = await response.json();
    return user;
}

const createUser = async (user: User): Promise<User> => {
    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const newUser = await response.json();
    return newUser;
}