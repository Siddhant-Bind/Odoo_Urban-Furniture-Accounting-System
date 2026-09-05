import * as auth from './auth.service.js';

export const signup = async (req, res, next) => { try { res.status(201).json(await auth.signup(req.body)); } catch (error) { next(error); } }

export const login = async (req, res, next) => { try { res.json(await auth.login(req.body)); } catch (error) { next(error); } };

export const createUser = async (req, res, next) => { try { res.status(201).json({ user: await auth.createUser(req.body) }); } catch (error) { next(error); } };
