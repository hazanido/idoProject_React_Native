import BaseController from './base';
import User, { IUser } from '../Model/userModel';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';



class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

    async updateProfileImage(req: Request, res: Response) {
        const userId = req.params.id;
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        try {
            const user = await User.findByIdAndUpdate(userId, { imgUrl: req.file.path }, { new: true });
            if (!user) {
                return res.status(404).send("User not found");
            }
            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            if (req.query.name) {
                const user = await User.findOne({ name: req.query.name } as Partial<IUser>);
                if (user) {
                    return res.status(200).json(user);
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
            } else {
                const users = await User.find();
                return res.status(200).json(users);
            }
        } catch (error) {
            console.error('Error getting users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async register(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;
        if (email == null || password == null) {
            return res.status(400).send("missing email or password");
        }
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                return res.status(409).json({ message: 'Email already in use' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                age: req.body.age,
            });
            await newUser.save();
            return res.status(200).send(newUser);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    async login(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).send("missing email or password");
        }
        try {
            const user = await User.findOne({ email: email });
            if (user == null) {
                return res.status(400).send("invalid email or password");
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).send("invalid password");
            }
            const token = jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION
            });
            const refreshToken = jwt.sign({
                _id: user._id,
                salt: Math.random()
            }, process.env.REFRESH_TOKEN_SECRET);

            if (user.tokens == null) {
                user.tokens = [refreshToken];
            } else {
                user.tokens.push(refreshToken);
            }
            await user.save();

            return res.status(200).send({
                accessToken: token,
                refreshToken: refreshToken
            });
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    async refresh(req: Request, res: Response) {
        const userHeader = req.headers['authorization'];
        const refreshToken = userHeader && userHeader.split(' ')[1];

        if (refreshToken == null) {
            return res.status(401).send("missing token");
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userId: { _id: string }) => {
            if (err) {
                return res.status(403).send("invalid token");
            }
            try {
                const user = await User.findById(userId._id);
                if (user == null || user.tokens == null || !user.tokens.includes(refreshToken)) {
                    if (user.tokens != null) {
                        user.tokens = [];
                        await user.save();
                    }
                    return res.status(403).send("invalid token");
                }
                const token = jwt.sign({
                    _id: user._id
                }, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                });
                const newRefreshToken = jwt.sign({
                    _id: user._id,
                    salt: Math.random()
                }, process.env.REFRESH_TOKEN_SECRET);

                user.tokens = user.tokens.filter(token => token != refreshToken);
                user.tokens.push(newRefreshToken);
                await user.save();

                return res.status(200).send({
                    accessToken: token,
                    refreshToken: newRefreshToken
                });
            } catch (error) {
                return res.status(400).send(error.message);
            }
        });
    }

    async logout(req: Request, res: Response) {
        const userHeader = req.headers['authorization'];
        const refreshToken = userHeader && userHeader.split(' ')[1];

        if (refreshToken == null) {
            return res.status(401).send("missing token");
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userId: { _id: string }) => {
            if (err) {
                return res.status(403).send("Invalid token");
            }

            try {
                const user = await User.findById(userId._id);
                if (!user) {
                    return res.status(404).send("User not found");
                }

                if (!user.tokens || !user.tokens.includes(refreshToken)) {
                    return res.status(403).send("invalid token");
                }

                user.tokens = user.tokens.filter(token => token != refreshToken);
                await user.save();

                return res.status(200).send("logout successfully");
            } catch (error) {
                return res.status(500).send("Internal server error");
            }
        });
    }

    async getCurrentUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Missing token' });
            }
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if (typeof decodedToken !== 'object' || !decodedToken._id) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            const userId = decodedToken._id;
            const user = await User.findById(userId).select('-password -tokens');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting current user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new UserController();
