import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from './../config/config';
import * as usuarioService from './usuarioService';
import { Usuario } from '../db/models/usuarioModel';
import { Request, Response } from 'express';
import { verifyPassword } from '../utils/auth/pass-verify';
import { signToken } from '../utils/auth/token-sign';


export const getUser = async(email_usuario: string, password_usuario: string) => {
    const user = await usuarioService.buscarEmail(email_usuario);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password_usuario, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password_usuario;
    return user;
};
 
export const singToken=(user: Usuario)=> {
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
};

export const changePassword = async(req: Request, res: Response) =>{
    const { token, newPassword } = req.body;
    try {
      const payload = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
      const user = await usuarioService.buscarUno(Number(payload.sub));
      if (!user || user.recovery_token !== token) {
        throw boom.notFound();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await usuarioService.actualizar(user.id, {
        recovery_token: undefined,
        password: hash,
      });
      res.send({ message: 'Contraseña cambiada' });
      return { message: 'Contraseña cambiada' };
    } catch (error) {
      throw boom.internal();
    }
  }

export const sendRecovery = async(req: Request, res: Response)=>{
    const { email } = req.body;
    console.log(email);
    const user = await usuarioService.buscarEmail(email);
    if (!user) {
       throw boom.notFound();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `https://sm8.com.mx/changePassword?token=${token}`;
    await usuarioService.actualizar(user.id, { recovery_token: token });
    const mail = {
      from: config.email,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `
        <main style="background-color: #171717; padding: 1rem; font-family: Arial, Helvetica, sans-serif;">
            <div style=" background-color: #262626; padding: 1.5rem; border-radius: 0.75rem;">
                <h2 style="color: #fde047; text-align: center">
                Recuperación De ContraseñaRecibimos una solicitud para restablecer la contraseña de su cuenta. Si no realizó esta solicitud, ignore este correo electrónico.
                </h2>
                <p style="text-align: center; color: white">¡Hola!</p>
                <p style="text-align: center; color: white">
                Recibimos una solicitud para restablecer la contraseña de su cuenta. Si no realizó esta solicitud, ignore este correo electrónico.
                </p>
                <p style="text-align: center; color: white">
                Para restablecer su contraseña, haga clic en el botón a continuación:
                </p>
                <a href="${link}" target="_blank">
                <button style="width: 100%; padding: 1rem; border-radius: 0.75rem; cursor: pointer; background-color: #fde047;">
                    Restablecer contraseña
                </button>
                </a>
                <p style="text-align: center; color: white">
                Si tiene alguna pregunta o inquietud, no dude en contactarnos en sistemas@sm8.com.mx
                </p>
            </div>
        </main>`,
    };

    const rta = await EnviarEmail(mail);
    res.send(rta); // Add this line to send the response
  };

export const EnviarEmail = async(infoMail: nodemailer.SendMailOptions)=>{
    const transporter = nodemailer.createTransport({
      host: config.hostEmail,
      port: 465,
      secure: true,
      auth: {
        user: config.email,
        pass: config.emailPass,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Correo enviado' };
  };

export const logout = async(req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.send({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    throw boom.internal();
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } }) as Usuario | null;

  if (!usuario) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await verifyPassword(password, usuario.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken({ id: usuario.id, email: usuario.email });

  // Configuración de la cookie para producción
  // res.cookie('authToken', token, {
  //   httpOnly: false,
  //   secure: process.env.COOKIE_SECURE === 'true',
  //   sameSite: 'none',
  //   domain: process.env.COOKIE_DOMAIN,
  //   path: '/',
  // });

  // Configuración de la cookie para producción
  res.cookie('authToken', token, {
    httpOnly: false, // Cambiado a true para seguridad (previene XSS)
    secure: true, // Solo HTTPS
    sameSite: 'none', // Permite cross-site (necesario para subdominios diferentes)
    domain: '.sm8.com.mx', // Sin punto inicial - cubre todos los subdominios
    path: '/',
  });

  res.status(200).json({ token });
};

