import { Request, Response } from "express";
import nodemailer from "nodemailer";

interface ContactoPayload {
  nombre: string;
  correoDestino: string;
  telefono: string;
  asunto: string;
  empresa: string;
  ciudad: string;
  mensaje: string;
  origen: string;
}

export const enviarCorreo = async (req: Request, res: Response) => {
  try {
    const { nombre, correoDestino, telefono, asunto, empresa, ciudad, mensaje, origen }: ContactoPayload = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !correoDestino || !telefono || !asunto || !empresa || !ciudad || !mensaje || !origen) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Crear el contenido del correo HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Nuevo mensaje de contacto</h2>
        <p style="background-color: #e8f4f8; padding: 10px; border-left: 4px solid #3498db; margin-bottom: 20px;">
          <strong>Origen:</strong> ${origen}
        </p>
        <hr style="border: none; border-top: 2px solid #3498db;">
        
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo de contacto:</strong> ${correoDestino}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Ciudad:</strong> ${ciudad}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        
        <hr style="border: none; border-top: 1px solid #bdc3c7; margin: 20px 0;">
        
        <h3 style="color: #2c3e50;">Mensaje:</h3>
        <p style="background-color: #ecf0f1; padding: 15px; border-left: 4px solid #3498db;">
          ${mensaje.replace(/\n/g, "<br>")}
        </p>
        
        <hr style="border: none; border-top: 1px solid #bdc3c7; margin: 20px 0;">
        <p style="color: #7f8c8d; font-size: 12px;">
          Este correo fue enviado desde el formulario de contacto de DEO API
        </p>
      </div>
    `;

    // Determinar destinatarios según el origen
    let destinatarios = process.env.EMAIL;
    if (origen === 'España' && process.env.EMAIL_ESPANA) {
      destinatarios = `${process.env.EMAIL}, ${process.env.EMAIL_ESPANA}`;
    }

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL,
      to: destinatarios, // Enviar al correo de contacto (y adicional si es España)
      replyTo: correoDestino, // Permitir responder al correo del usuario
      subject: `[Contacto - ${origen}] ${asunto}`,
      html: htmlContent,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    // Responder al cliente
    res.status(200).json({
      success: true,
      message: "Correo enviado exitosamente",
    });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar el correo",
      error: error instanceof Error ? error.message : error,
    });
  }
};
