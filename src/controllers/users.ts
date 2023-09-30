import { Request, Response } from "express"
import User from "../models/user"


export const getUsers = async ( req: Request, res: Response ) => {

    const users = await User.findAll()

    res.json( { users } );
}

export const getUser = async ( req: Request, res: Response ) => {

    const { id } = req.params

    const user = await User.findByPk( id )

    if ( user ) {
        res.json( user );
    } else {
        res.status(404).json({
            msg: `User with id ${ id } not found`
        })
    }
}

export const postUser = async ( req: Request, res: Response ) => {

    const { body } = req;

    const user = User.build( body );

    await user.save();
     
    res.json( { user } );
}

export const putUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    const user = await User.findByPk( id );

    if ( !user ) {
        return res.status(404).json({
            msg: `User with id ${ id } not found`
        })
    }

    await user.update( body );

    res.json( user );
}

export const deleteUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( !user ) {
        return res.status(404).json({
            msg: `User with id ${ id } not found`
        })
    }

    await user.update( { status: 0 } );

    res.json( user );
}

